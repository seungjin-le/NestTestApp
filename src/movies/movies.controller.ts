import {
  applyDecorators,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Movie } from "./entities/Movie.entity";
import { DeleteMovieDto } from "./dto/delete-movie.dto";

function movies() {
  return applyDecorators(ApiTags("영화"), Controller("api/v1/movies"));
}

@movies()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: "영화 전체 목록 조회", description: "영화 전체 목록을 조회한다." })
  @ApiResponse({
    status: 200,
    description: "영화 전체 목록을 조회",
    type: [Movie],
  })
  @ApiResponse({ status: 400, description: "영화 전체 목록 조회 실패" })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "페이지 번호",
  })
  @ApiQuery({
    name: "size",
    required: false,
    type: Number,
    description: "페이지 사이즈",
  })
  @Get()
  getAll(@Query("page") page: number, @Query("size") size: number) {
    return this.moviesService.getAll({
      page,
      size,
    });
  }
}

@movies()
export class GetDetailMovieController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: "영화 상세 조회" })
  @ApiParam({ name: "id", required: true, description: "영화 아이디" })
  @ApiResponse({
    status: 200,
    description: "영화 상세 조회",
    type: Movie,
  })
  @Get(":id")
  getDetail(@Param("id") movieId: number) {
    return this.moviesService.getDetail(movieId);
  }
}

@movies()
export class CreateMovieController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: "영화 생성", description: "영화를 생성한다." })
  @ApiBody({ description: "영화를 생성한다.", type: CreateMovieDto })
  @ApiResponse({
    status: 200,
    description: "영화 생성",
    type: Movie,
  })
  @ApiResponse({ status: 400, description: "영화 생성 실패" })
  post(@Body() movieData: CreateMovieDto) {
    return this.moviesService.post(movieData);
  }
}

@movies()
export class DeleteMovieController {
  constructor(private readonly moviesService: MoviesService) {}

  @Delete(":id")
  @ApiOperation({ summary: "영화 삭제", description: "영화를 삭제한다." })
  @ApiParam({ name: "id", required: true, description: "영화 아이디" })
  @ApiResponse({
    status: 200,
    description: "영화 삭제",
    type: DeleteMovieDto,
  })
  delete(@Param("id") movieId: number) {
    return this.moviesService.delete(movieId);
  }
}

@movies()
export class PatchMoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Patch(":id")
  @ApiOperation({ summary: "영화 수정", description: "영화를 수정한다." })
  @ApiBody({ description: "영화를 수정한다.", type: UpdateMovieDto })
  @ApiParam({ name: "id", required: true, description: "영화 아이디" })
  @ApiResponse({
    status: 200,
    description: "영화 수정",
    type: Movie,
  })
  patch(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.patch(movieId, updateData);
  }
}
