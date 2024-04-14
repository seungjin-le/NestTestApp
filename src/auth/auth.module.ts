import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthPostLoginController, AuthPostRefreshController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import AuthSchema from "./auth.schema";

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: "auth", schema: AuthSchema.schema }])],
  controllers: [AuthPostRefreshController, AuthPostLoginController],
  providers: [AuthService],
})
export class AuthModule {}
