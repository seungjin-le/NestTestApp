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

@Controller("movies")
export class MoviesController {
  constructor(readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.getAll();
  }
  @Get("/:id")
  getDetail(@Param("id") movieId: string) {
    return this.moviesService.getDetail(movieId);
  }
  @Post()
  post(@Body() movieData) {
    return this.moviesService.post(movieData);
  }
  @Patch("/:id")
  patch(@Param("id") movieId: string) {
    return `This will return one movie with the id: ${movieId}`;
  }
  @Delete("/:id")
  delete(@Param("id") movieId: string) {
    return `This will return one movie with the id: ${movieId}`;
  }
}
