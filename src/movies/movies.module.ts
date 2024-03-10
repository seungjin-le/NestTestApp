import { Module } from "@nestjs/common";
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";
import MovieSchema from "./movies.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Movie } from "./entities/Movie.entity";

@Module({
  imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema.schema }])],
  controllers: [MoviesController],
  providers: [MoviesService, MovieSchema],
})
export class MoviesModule {}
