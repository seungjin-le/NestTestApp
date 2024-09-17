import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity } from "@/user/entities/user.entity";
import UserSchema from "@/user/user.schema";
import { UserService } from "@/user/user.service";
import {
  UserGetAllController,
  UserGetDetailController,
  UserPostJoinController,
  UserPatchController,
} from "@/user/user.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema.schema }])],
  controllers: [UserGetAllController, UserGetDetailController, UserPostJoinController, UserPatchController],
  providers: [UserService, UserSchema],
  exports: [UserService],
})
export class UserModule {}
