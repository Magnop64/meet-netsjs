import { IsNotEmpty, Matches, MinLength } from "class-validator"
import { messageHelperMeet } from "../helper/messageMeet.helper"

export class createMeet{
    @IsNotEmpty({message: messageHelperMeet.CREATE_NAME_NOT_FAUND})
    @MinLength(2, {message: messageHelperMeet.CREATE_NAME_NOT_FAUND})
    name: string

    @IsNotEmpty({message: messageHelperMeet.CREATE_COLOR_NOT_FAUND})
    @Matches(/[0-9A-Fa-f]{6}/g,{message: messageHelperMeet.CREATE_COLOR_NOT_FAUND})
    color: string
}