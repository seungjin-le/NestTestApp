import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import {
  UserGetAllController,
  UserGetDetailController,
  UserPostJoinController,
  UserPatchController,
  UserPostLoginController,
} from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity } from "./entities/user.entity";
import UserSchema from "./user.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema.schema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [
    UserGetAllController,
    UserGetDetailController,
    UserPostJoinController,
    UserPatchController,
    UserPostLoginController,
  ],
  providers: [UserService],
})
export class UserModule {}
