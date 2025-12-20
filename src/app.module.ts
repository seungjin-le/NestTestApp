import { Module } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { InjectConnection, MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PostUserModule } from "./post_user/post_user.module";
// import { DbModule } from "./db/db.module";
import { EventModule } from "./event/event.module";
import { SocketModule } from './socket/socket.module';
import configuration from "@/config/configuration";

@Module({
  imports: [
    /** 
     * @description 환경 변수 모듈
     * @param load 환경 변수 파일 로드
     * @param isGlobal 환경 변수 모듈 전역 설정
     * @param envFilePath 환경 변수 파일 경로
     * @returns ConfigModule 환경 변수 모듈
     */
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ".env",
    }),  
    ConfigModule.forRoot({}),

    /** 
     * @description JWT 모듈
     * @param global JWT 모듈 전역 설정
     * @param secret JWT 모듈 시크릿 키
     * @param signOptions JWT 모듈 서명 옵션
     * @returns JwtModule JWT 모듈
     */
    JwtModule.register({
      // JWT 모듈
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "30m", algorithm: "HS256" },
    }),

    /** 
     * @description MongoDB 모듈
     * @param uri MongoDB 모듈 연결 주소
     * @returns MongooseModule MongoDB 모듈
     */
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URL,
      }),
    }),
    EventModule, // 이벤트 모듈
    MoviesModule, // 영화 모듈
    AuthModule, // 인증 모듈
    UserModule, // 사용자 모듈
    PostUserModule, SocketModule, // 게시글 모듈
    // DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(@InjectConnection() private readonly mongooseConnection: Connection) {
    /** @description MongoDB 연결 상태 확인 */
    const mongooseInstance = this.mongooseConnection;


    if (mongooseInstance.readyState === 1) {
      console.log("MongoDB 연결 성공!", process.env.MONGODB_URL);
    } else {
      console.error("MongoDB 연결 실패:", process.env.MONGODB_URL, mongooseInstance.readyState);
    }
  }
}
