import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AUTH_MODEL_NAME, AuthSchema } from "./auth.schema";
import { AuthGuard } from "./auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: AUTH_MODEL_NAME,
        schema: AuthSchema,
      },
    ]),
    JwtModule.registerAsync({
      // JWT 모듈
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>("jwt.secret"),

        signOptions: { expiresIn: "1h", algorithm: "HS256" },
      }),
    }),
  ],
  controllers: [AuthController],

  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
