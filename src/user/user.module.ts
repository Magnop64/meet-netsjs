import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SchemaUser, User } from "./schema/user.schema";
import { UserServices } from "./user.services";
import { userController } from "./user.controller";

@Module({
    imports : [MongooseModule.forFeature([{name : User.name, schema : SchemaUser}])],
    controllers : [userController],
    providers : [UserServices],
    exports : [MongooseModule, UserServices]
})


export class moduleUser {}