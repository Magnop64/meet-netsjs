
import { Strategy , ExtractJwt} from 'passport-jwt';
import { PassportStrategy} from '@nestjs/passport';
import { Injectable} from '@nestjs/common';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy){
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.KEY_JWT_CRYPTO
    })
  }
  async validate(payload : any){
    return{ userId : payload.sub, userName : payload.userName}
  }
}