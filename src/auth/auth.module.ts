import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthPostLoginController, AuthPostRefreshController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import AuthSchema from "./auth.schema";
// import { AuthGuard } from "./auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: "Auth",
        schema: AuthSchema.schema,
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthPostRefreshController, AuthPostLoginController],

  providers: [
    AuthService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AuthModule {}
