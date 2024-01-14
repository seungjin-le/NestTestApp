import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.getAll();
  }
  @Get("/:id")
  getDetail(@Param("id") movieId: number) {
    return this.moviesService.getDetail(movieId);
  }
  @Post()
  post(@Body() movieData: CreateMovieDto) {
    return this.moviesService.post(movieData);
  }
  @Patch("/:id")
  patch(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.patch(movieId, updateData);
  }
  @Delete("/:id")
  delete(@Param("id") movieId: number) {
    return this.moviesService.delete(movieId);
  }
}
