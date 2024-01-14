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
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("movies")
@ApiTags("Movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: "영화 전체 목록 조회" })
  getAll() {
    return this.moviesService.getAll();
  }
  @Get("/:id")
  @ApiOperation({ summary: "영화 상세 조회" })
  @ApiCreatedResponse({ description: "영화를 상세 조회한다" })
  getDetail(@Param("id") movieId: number) {
    return this.moviesService.getDetail(movieId);
  }
  @Post()
  @ApiOperation({ summary: "영화 생성", description: "영화를 생성한다." })
  @ApiCreatedResponse({ description: "영화를 생성한다", type: CreateMovieDto })
  post(@Body() movieData: CreateMovieDto) {
    return this.moviesService.post(movieData);
  }
  @Patch("/:id")
  @ApiOperation({ summary: "영화 수정", description: "영화를 수정한다." })
  @ApiCreatedResponse({ description: "영화를 수정한다", type: UpdateMovieDto })
  patch(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.patch(movieId, updateData);
  }
  @Delete("/:id")
  @ApiOperation({ summary: "영화 삭제", description: "영화를 삭제한다." })
  delete(@Param("id") movieId: number) {
    return this.moviesService.delete(movieId);
  }
}
