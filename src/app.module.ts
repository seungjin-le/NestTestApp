import { Module } from "@nestjs/common";
import { InjectConnection, MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";
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

    /** 
     * @description MongoDB 모듈
     * @param uri MongoDB 모듈 연결 주소
     * @returns MongooseModule MongoDB 모듈
     */
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>("database.mongodbUrl"),
      }),
    }),
    AuthModule, // 인증 모듈
    ProductModule, // 상품 모듈
    UserModule, // 사용자 모듈
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(@InjectConnection() private readonly mongooseConnection: Connection) {
    /** @description MongoDB 연결 상태 확인 */
    const mongooseInstance = this.mongooseConnection;


    if (mongooseInstance.readyState === 1) {
      console.log("MongoDB 연결 성공!");
    } else {
      console.error("MongoDB 연결 실패:", mongooseInstance.readyState);
    }
  }
}
