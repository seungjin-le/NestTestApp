import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthPostLoginController, AuthPostRefreshController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import AuthSchema from "./auth.schema";
import { AuthGuard } from "./auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: "Auth",
        schema: AuthSchema.schema,
      },
    ]),
    JwtModule.registerAsync({
      // JWT 모듈
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get("JWT_SECRET"),

        signOptions: { expiresIn: "1h", algorithm: "HS256" },
      }),
    }),
  ],
  controllers: [AuthPostRefreshController, AuthPostLoginController],

  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
