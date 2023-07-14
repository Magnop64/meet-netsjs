import { IsArray, IsNotEmpty, IsNumber, IsString, Max, Min, ValidateNested } from "class-validator";
import { createMeet } from "./createMeet.dto";
import { messageHelperMeet } from "../helper/messageMeet.helper";
import { Type } from "class-transformer";

export class updateMeetDto extends createMeet{

    @IsArray({message: messageHelperMeet.UPDATE_OBJECT_NAME_NOT_FAUND})
    @Type(()=> updateMeetObject)
    @ValidateNested({each: true})
    object: Array<updateMeetObject>
}

export class updateMeetObject{
    @IsNotEmpty({message: messageHelperMeet.UPDATE_OBJECT_NAME_NOT_FAUND})
    name: string;

    @IsNumber({},{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    @Min(0,{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    @Max(8,{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    x: number;

    @IsNumber({},{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    @Min(0,{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    @Max(8,{message: messageHelperMeet.UPDATE_XY_NOT_FAUND})
    y: number;

    @IsNumber({},{message: messageHelperMeet.UPDATE_ZINDEX_NOT_FAUND})
    zIndex: number;

    @IsString({message: messageHelperMeet.UPDATE_ORIENTATION_NOT_FAUND})
    orientation: string;
}