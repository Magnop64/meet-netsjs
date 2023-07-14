import { IsEmail , IsNotEmpty} from "class-validator";
import { messegeHelp } from "../helpers/messenges.helper";

export class loginDto {
    @IsEmail({}, {message: messegeHelp.auth_login_not_faund})
    login : string;

    @IsNotEmpty({message : messegeHelp.auth_password_not_faund})
    password : string
}