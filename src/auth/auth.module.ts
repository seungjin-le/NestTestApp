import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth } from "./entities/auth.entity";
import AuthSchema from "./auth.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema.schema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
