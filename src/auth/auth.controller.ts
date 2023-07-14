import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { loginDto } from "./dtos/login.dto";
import { cadastroDto } from "src/user/dtos/user.dto";
import { isPublic } from "./decorators/isPublic.decorators";


@Controller("auth")
export class authController {
    constructor(private readonly authServices : AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @isPublic()
    login(@Body() dto : loginDto){
        return this.authServices.login(dto);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @isPublic()
    register(@Body() dto : cadastroDto){
        return this.authServices.register(dto);
    }

}