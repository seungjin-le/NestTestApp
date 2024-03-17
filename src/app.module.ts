import { Module } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";

import { InjectConnection, MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { Connection } from "mongoose";
import { MembersModule } from "./members/members.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        // uri: process.env.MONGODB_URL,
        uri: "mongodb://localhost:27017/shop",
      }),
    }),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
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
