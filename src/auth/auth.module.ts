import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { AuthService } from './auth.services';
import { moduleUser } from 'src/user/user.module';
import { JwtModule} from '@nestjs/jwt';
import { jwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
        moduleUser,
        JwtModule.register({
        secret: process.env.KEY_JWT_CRYPTO
        })
    ],
    controllers: [authController],
    providers: [AuthService, jwtStrategy]
})

export class AuthModule {}