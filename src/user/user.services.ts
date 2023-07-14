import {Model} from 'mongoose';
import { Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { User, DocumentUser } from './schema/user.schema';
import { cadastroDto } from './dtos/user.dto';
import  * as CryptoJS from 'crypto-js';
import { updateUserDto } from './dtos/updatuser.dto';

@Injectable()
export class UserServices {
    constructor(@InjectModel(User.name) private userModel : Model<DocumentUser> ){}

    async create (dto : cadastroDto){
        dto.password = CryptoJS.AES.encrypt(dto.password, process.env.key_Crypto).toString();

        const createdUser = new this.userModel(dto);
        await createdUser.save();
        
        return createdUser
    }

    async existByEmail(email : string) : Promise<boolean>{
        const result = await this.userModel.findOne({email});

        if(result){
            return true;
        }
        return false;
    }

    async GetUserByLoginPassword(email: string, password: string): Promise < DocumentUser | null>{
        const result = await this.userModel.find({email});

        if(result && result.length > 0){
            const user = result[0] as DocumentUser;

            const bytesPassword = await CryptoJS.AES.decrypt(user.password, process.env.key_Crypto);

            const passwordSavad = await bytesPassword.toString(CryptoJS.enc.Utf8);
           
            if(password === passwordSavad){
                return user;
            }
        }
        return null
    }

    async getUserById(id : string){
        return await this.userModel.findOne({_id : id});
    }

    async updateUserId(id:string, dto: updateUserDto){
        return await this.userModel.findByIdAndUpdate(id, dto)
    }
}