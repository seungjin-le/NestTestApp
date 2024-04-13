import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthPostLoginController, AuthPostRefreshController } from "./auth.controller";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [AuthPostRefreshController, AuthPostLoginController],
  providers: [AuthService],
})
export class AuthModule {}
