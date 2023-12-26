import { Module } from "@nestjs/common";
import { MoviesController } from "./movies/movies.controller";
import { MoviesService } from "./movies/movies.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: "mongodb://localhost:27017/nest_test",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {}
