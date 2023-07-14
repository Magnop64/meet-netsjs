import { Controller, Get, Request, BadRequestException, HttpCode, HttpStatus, Body, Put,  } from '@nestjs/common';
import { UserServices } from './user.services';
import { messageUserhelper } from './helpers/user.helpers';
import { updateUserDto } from './dtos/updatuser.dto';

@Controller('user')
export class userController{
     constructor(private readonly userService: UserServices){}

     @Get()
     async getUser(@Request() req : any){
        const {userId} = req?.user;
        if(!userId){
            throw new BadRequestException(messageUserhelper.USER_NOT_FAUND);
        }
        const user = await this.userService.getUserById(userId);
        if(!user){
            throw new BadRequestException(messageUserhelper.USER_NOT_FAUND);
        }
        return{
            nome : user.name,
            email : user.email,
            avatar : user.avatar,
            id : user._id.toString()
        }    
    }

        @Put()
        @HttpCode(HttpStatus.OK)
        async updateUser(@Request() req, @Body() dto: updateUserDto){
            const {userId} = req?.user;
            await this.userService.updateUserId(userId, dto);

            if(!this.userService.updateUserId){
                throw new BadRequestException(messageUserhelper.USER_NOT_FAUND)
            }
            return ({message : messageUserhelper.UPDATE_USER});
        }
}