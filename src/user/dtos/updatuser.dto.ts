import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { messageUserhelper } from "../helpers/user.helpers";


export class updateUserDto{
    @IsNotEmpty({message: messageUserhelper.REGISTER_NAME_NOT_VALID})
    @MinLength(2, {message: messageUserhelper.REGISTER_NAME_NOT_VALID})
    name: string;

    @IsString()
    avatar: string;
}