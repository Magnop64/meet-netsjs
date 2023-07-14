import { IsNumber, IsString, Max, Min } from "class-validator";
import { JoinRoomDto } from "./joinroom.dto";
import { messageHelperMeet } from "src/meet/helper/messageMeet.helper";


export class UpdateUserPosition extends JoinRoomDto{

    @IsNumber({},{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    @Min(0,{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    @Max(8,{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    x: number;

    @IsNumber({},{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    @Min(0,{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    @Max(8,{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    y: number;

    @IsString({message: messageHelperMeet.UPDATE_ORIENTATION_NOT_FAUND})
    orientation: string;
}