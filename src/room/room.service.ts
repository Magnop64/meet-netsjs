import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meet, MeetDocument } from 'src/meet/schema/modelMeet.schema';
import { objectMeet, objectMeetDocument } from 'src/meet/schema/objectMeet.schema';
import { position, positionDocument } from './schema/orientation.schema';
import { UserServices } from 'src/user/user.services';
import { MessageRoom } from './helpers/roommessage.helpers';
import { UpdateUserPosition } from './dtos/updateuser.dto';
import { TagalMutDto } from './dtos/togolmute.dto';

@Injectable()
export class RoomService {
    private logger = new Logger(RoomService.name);

    constructor(
        @InjectModel(Meet.name) private MeetModel: Model<MeetDocument>,
        @InjectModel(objectMeet.name) private ObjectModel: Model<objectMeetDocument>,
        @InjectModel(position.name) private PositionModel: Model<positionDocument>,
        private readonly UserService : UserServices
    ){}

    async getRoom(link: string){
        this.logger.debug(`room - ${link}`);

        const meet = await this._getMeet(link)
        const objects = await this.ObjectModel.find({meet});

        return {
            link,
            name: meet.name,
            color: meet.color,
            objects
        }
    }

    async positionUsersByLink(link: string){
        this.logger.debug(`PositionUsersByLink - ${link}`);

        const meet = await this._getMeet(link);
        return await this.PositionModel.find({meet});
    }

    async deleteUsersLink(clientId: string){
        this.logger.debug(`deleteUsersLink - ${clientId}`);
        return await this.PositionModel.deleteMany({clientId});
    }

    async updatPositionUser(clientId: string, dto : UpdateUserPosition){
        this.logger.debug(`updatPositionUser - ${dto.link}`);

        const meet = await this._getMeet(dto.link);
        const user = await this.UserService.getUserById(dto.userId);

        if(!user){
            throw new BadRequestException(MessageRoom.JOIN_USER_NOT_VALED);
        }

        const position = {
            ...dto,
            clientId,
            meet,
            user,
            name: user.name,
            avatar: user.avatar
        }

        const userInRoom = await this.PositionModel.find({meet});


        const loggerUserInRoom = userInRoom.find(use => 
            use.user.toString() === user._id.toString() || use.clientId === clientId)

        if(loggerUserInRoom){
            await this.PositionModel.findByIdAndUpdate({_id: loggerUserInRoom._id},position)
        }else{
            if(userInRoom && userInRoom.length > 10){
                throw new BadRequestException(MessageRoom.ROOM_MAX_USERS);
            }
            await this.PositionModel.create(position);
        }
    }

    async updatMutedUser(dto: TagalMutDto){
        this.logger.debug(`updatMutedUser - ${dto.link} - ${dto.userId}`);
        const meet = await this._getMeet(dto.link);
        const user = await this.UserService.getUserById(dto.userId);
        await this.PositionModel.updateMany({user, meet},{muted: dto.muted});
    }

    async _getMeet(link: string){
        const meet = await this.MeetModel.findOne({link});
        if(!meet){
            throw new BadRequestException(MessageRoom.LINK_NOT_VALID)
        }
        return meet;
    }
}
