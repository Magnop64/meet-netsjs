import { IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";
import { messageUserhelper } from "../helpers/user.helpers";


export class cadastroDto {
    @IsEmail({},{message : messageUserhelper.GESISTER_EMAIL_NOT_VALID})
    email : string;

    @MinLength(2, {message : messageUserhelper.REGISTER_NAME_NOT_VALID})
    name : string;

    @MinLength(4,{message : messageUserhelper.REGISTER_PASSWORD_NOT_VALID})
    @MaxLength(12,{message : messageUserhelper.REGISTER_PASSWORD_NOT_VALID})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message : messageUserhelper.REGISTER_PASSWORD_NOT_VALID})
    password : string;

    @IsString()
    avatar : string;
}