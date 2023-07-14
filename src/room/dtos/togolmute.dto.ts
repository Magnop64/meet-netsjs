import { IsBoolean } from "class-validator";
import { JoinRoomDto } from "./joinroom.dto";
import { MessageRoom } from "../helpers/roommessage.helpers";

export class TagalMutDto extends JoinRoomDto{
    
    @IsBoolean({message: MessageRoom.MUTE_NOT_VALID})
    muted: boolean;
}