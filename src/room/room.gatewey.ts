import { WebSocketGateway, WebSocketServer, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './dtos/joinroom.dto';
import { UpdateUserPosition } from './dtos/updateuser.dto';
import { TagalMutDto } from './dtos/togolmute.dto';

type activeSocketsType = {
    room: string;
    id: string;
    userId: string;
}

@WebSocketGateway()
export class gateweyroom implements OnGatewayInit, OnGatewayDisconnect{

    constructor(
        private readonly service: RoomService
    ){}

    @WebSocketServer() wss: Server;

    private readonly logger = new Logger(gateweyroom.name);
    private activeSckets : activeSocketsType[] = [];

    afterInit(server: any) {
        this.logger.debug(`gatewey initialized`);
    }

    async handleDisconnect(client: any) {

        const existOnSocket = this.activeSckets.find(
            socket => socket.id === client.id
        );

        if(!existOnSocket)return;

        this.activeSckets = this.activeSckets.filter(
            socket => socket.id !== client.id
        );

        await this.service.deleteUsersLink(client.id);
        client.broadcast.emit(`${existOnSocket.room} - remove-user ${{socketId: client.id}}`);

        this.logger.debug(`Client: ${client.id} disconnected`);
    }

    @SubscribeMessage('join')
    async handlejoin(client: Socket, payload: JoinRoomDto){
        const {link , userId } = payload;

        const existeSocket = this.activeSckets.find(
            socket => socket.room === link && socket.id === client.id
        );

        if(!existeSocket){
            this.activeSckets.push({room: link, id: client.id, userId});

            const dto = {
                link,
                userId,
                x: 2,
                y:2,
                orientation: 'dowm',
            } as UpdateUserPosition;

            await this.service.updatPositionUser(client.id, dto);
            const users = await this.service.positionUsersByLink(link);

            //mostra para todps a atualização
            this.wss.emit(`${link} - update-users-list${users}`);
            //mostra para todos , menos para min.
            client.broadcast.emit(`${link} - add-user `, {user: client.id});
        }
        this.logger.debug(`Socket client ${client.id}start to join room ${link}`);
    } 

    @SubscribeMessage('move')
    async handleMove(client: Socket, payload: UpdateUserPosition){
        const {link , userId, x, y, orientation } = payload;

        const dto = {
            link,
            userId,
            x: 2,
            y:2,
            orientation: 'dowm',
        } as UpdateUserPosition;

        await this.service.updatPositionUser(client.id, dto);
        const users = await this.service.positionUsersByLink(link);
        this.wss.emit(`${link} - update-users-list${users}`);

    }

    @SubscribeMessage('tagl-Mute')
    async handleTaglMute(_: Socket, payload: TagalMutDto){
        const{link} = payload;

        await this.service.updatMutedUser(payload);
        const users = await this.service.positionUsersByLink(link);
        this.wss.emit(`${link} - update-users-list${users}`);

    }

    @SubscribeMessage('call-user')
    async calluser(client: Socket, data: any){
        this.logger.debug(`${client.id} to: ${data.to}`);
        client.to(client.id).emit('call.made',{
            offer: data.offer,
            socket: client.id
        })
    }

    @SubscribeMessage('make-answer')
    async makeAnswer(client: Socket, data: any){
        this.logger.debug(`${client.id} to: ${data.to}`);
        client.to(client.id).emit('make-answer',{
            answer: data.answer,
            socket: client.id
        })
    }

}