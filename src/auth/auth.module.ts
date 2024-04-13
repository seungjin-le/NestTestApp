import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGetAllController, AuthPostLoginController } from "./auth.controller";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [AuthGetAllController, AuthPostLoginController],
  providers: [AuthService],
})
export class AuthModule {}
