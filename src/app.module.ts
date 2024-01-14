import { Module } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   useFactory: () => ({
    //     uri: "mongodb://localhost:27017/nest_test",
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    // }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
