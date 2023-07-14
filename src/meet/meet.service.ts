import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Meet, MeetDocument } from "./schema/modelMeet.schema";
import { createMeet } from "./dto/createMeet.dto";
import { UserServices } from "src/user/user.services";
import { GenerateLink } from "./helper/linkGenerate.helper";
import { objectMeet, objectMeetDocument } from "./schema/objectMeet.schema";
import { updateMeetDto } from "./dto/updatemet.dto";
import { messageHelperMeet } from "./helper/messageMeet.helper";

@Injectable()
export class meetServices{
    private readonly logger = new Logger(meetServices.name);

    constructor(
        @InjectModel(Meet.name) private model: Model<MeetDocument>,
        @InjectModel(objectMeet.name) private modelObject: Model<objectMeetDocument>,
        private readonly userSevice: UserServices
    ){}
    
    async GetMeetByUser(userId:string){
        this.logger.debug(`GetMeetByUser - ${userId}`);
        return await this.model.find({user: userId});
    }

    async CreateMeet(userId:string, dto:createMeet){
        this.logger.debug(`CreateMeet - ${userId}`)
        
        const user = await this.userSevice.getUserById(userId);
         const meet = {
            ...dto,
            user,
            link: GenerateLink()
         };

        const createdMeet = new this.model(meet);
        await createdMeet.save();
    }

    async DeleteMeet(userId: string, meetId:string){
        this.logger.debug(`DeleteMeet - ${userId} - ${meetId}`);
        return await this.model.deleteOne({user: userId, _id: meetId});
    }

    async getMeetObjects(meetId: string, userId: string){
        this.logger.debug(`getMeetObjects - ${userId} - ${meetId}`)
        const user = await this.userSevice.getUserById(userId)
        const meet = await this.model.findOne({user, _id: meetId})

        return await this.modelObject.find({meet})
    }

    async updateMeet(meetId: string, userId: string, dto: updateMeetDto){
        this.logger.debug(`updateMmeet - ${userId} - ${meetId}`)
        const user = await this.userSevice.getUserById(userId)
        const meet = await this.model.findOne({user, _id: meetId})

        if(!meet){
            throw new BadRequestException(messageHelperMeet.UPDATE_MEET_NOT_FOUND)
        }

        meet.name = dto.name,
        meet.color = dto.color
        await this.model.findByIdAndUpdate({_id: meetId}, meet)

        await this.modelObject.deleteMany({meet})

        let objectPayload;

        for(const object of dto.object){
            objectPayload = {
                meet,
                ...object
            }

            await this.modelObject.create(objectPayload);
        }
    }
}