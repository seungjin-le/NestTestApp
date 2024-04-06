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

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema.schema }])],
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
