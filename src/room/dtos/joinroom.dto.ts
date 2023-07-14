import { IsNotEmpty } from "class-validator";
import { MessageRoom } from "../helpers/roommessage.helpers";

export class JoinRoomDto{
    
    @IsNotEmpty({message: MessageRoom.JOIN_USER_NOT_VALED})
    userId: string;

    @IsNotEmpty({message: MessageRoom.LINK_NOT_VALID})
    link: string;
}