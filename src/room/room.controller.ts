import { Controller, Get, Param , HttpCode, HttpStatus } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService){}
    
    @Get(':link')
    @HttpCode(HttpStatus.OK)
    async GetRoom(@Param() params){
        const {link} = params;
        return this.roomService.getRoom(link);
    }
}
