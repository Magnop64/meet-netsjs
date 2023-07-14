import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from '@nestjs/core';
import { KEY_PUBLIC } from "../decorators/isPublic.decorators";

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt'){
    constructor( private reflector: Reflector){
        super()
    }

    canActivate(context: ExecutionContext){
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            KEY_PUBLIC,[context.getHandler(), context.getClass()]
        )

        if(isPublic){
            return true
        }

        const CanActivate = super.canActivate(context);

        if(typeof CanActivate === 'boolean'){
            return CanActivate
        }

        const canActivatePromise = CanActivate as Promise<boolean>;

        return canActivatePromise.catch((error)=> {
            if(error && error.message){
                throw new UnauthorizedException(error.massage)
            }
            throw new UnauthorizedException()
        })
    }
}