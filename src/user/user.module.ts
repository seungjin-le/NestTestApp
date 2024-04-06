import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import {
  UserGetAllController,
  UserGetDetailController,
  UserPostJoinController,
  UserPatchController,
  UserPostLoginController,
} from "./user.controller";

@Module({
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
