import { Module } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { InjectConnection, MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";
import { PostUserModule } from "./post_user/post_user.module";
import { DbModule } from "./db/db.module";
import { MassageGateway } from "./message/message.gateway";
import { MessageModule } from "./message/message.module";
import { EventService } from "./event/event.service";
import { EventController } from "./event/event.controller";
import { EventModule } from "./event/event.module";
import configuration from "@/config/configuration";

@Module({
  imports: [
    // 환경 변수 모듈
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ".env",
    }),
    ConfigModule.forRoot({}), // 환경 변수 모듈
    JwtModule.register({
      // JWT 모듈
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "30m", algorithm: "HS256" },
    }),
    // MongoDB 모듈
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URL || "mongodb://mongodb:27017/mydatabase",
      }),
    }),
    EventModule, // 이벤트 모듈
    MoviesModule, // 영화 모듈
    AuthModule, // 인증 모듈
    UserModule, // 사용자 모듈
    ProductModule, // 상품 모듈
    PostUserModule, // 게시글 모듈
    DbModule,
    MessageModule,
  ],
  controllers: [EventController],
  providers: [MassageGateway, EventService],
})
export class AppModule {
  constructor(@InjectConnection() private readonly mongooseConnection: Connection) {
    // MongoDB 연결 상태 확인
    const mongooseInstance = this.mongooseConnection;
    if (mongooseInstance.readyState === 1) {
      console.log("MongoDB 연결 성공!");
    } else {
      console.error("MongoDB 연결 실패:", mongooseInstance.readyState);
    }
  }
}
