import { BadRequestException, Injectable, Logger} from "@nestjs/common";
import { loginDto } from "./dtos/login.dto";
import { messegeHelp } from "./helpers/messenges.helper";
import { UserServices } from "src/user/user.services";
import { cadastroDto } from "src/user/dtos/user.dto";
import { messageUserhelper } from "src/user/helpers/user.helpers";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{

    private logger = new Logger(AuthService.name);

    constructor(private readonly useService : UserServices,
                private readonly jwtService : JwtService
        ){}

    async login(dto : loginDto){
        this.logger.debug('login - started')

        const user = await this.useService.GetUserByLoginPassword(dto.login, dto.password);

        if(user == null){
            throw new BadRequestException(messegeHelp.auth_password_or_login_not_faund);
        }
        const tokenPayload = {
            email : user.email,
            sub : user._id
        }

        return {
            nome : user.name,
            email : user.email,
            token : this.jwtService.sign(tokenPayload, {secret: process.env.KEY_JWT_CRYPTO})
        }
    }

    async register(dto: cadastroDto){
        this.logger.debug('register - started')
        if(await this.useService.existByEmail(dto.email)){
            throw new BadRequestException(messageUserhelper.EXIST_EMAIL_ACONT)
        }

        const user = await this.useService.create(dto);

        if(user){
            return {
                message: messageUserhelper.USER_REGISTER
            }
        }
    }
}