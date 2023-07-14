import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { moduleUser } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { jwtAuthGuard } from './auth/guards/jwt.guards';
import { meetModule } from './meet/meet.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.key_DataBase),
    AuthModule,
    moduleUser,
    meetModule,
    RoomModule
  ],
  controllers: [],
  providers: [
    {provide : APP_GUARD, useClass: jwtAuthGuard }
  ],
})
export class AppModule {}
