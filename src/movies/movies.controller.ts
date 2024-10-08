import { Body, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/Movie.entity";
import { DeleteMovieDto } from "./dto/delete-movie.dto";
import { apiOperation, apiParam, apiQuery, apiBody, apiResponse, controller } from "@/utils/apiDecorators";
import { Response } from "express";

@controller("영화", "api/v1/movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @apiOperation("영화 전체 목록 조회", "영화 전체 목록을 조회한다.")
  @apiResponse(200, "영화 전체 목록 조회", [Movie])
  @apiResponse(404, "영화 전체 목록 조회 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  @apiQuery("page", false, Number, "페이지 번호")
  @apiQuery("size", false, Number, "페이지 사이즈")
  getAll(@Query("page") page: number, @Query("size") size: number, res: Response) {
    return this.moviesService.getAll({
      page,
      size,
      res,
    });
  }
}

@controller("영화", "api/v1/movies")
export class GetDetailMovieController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(":id")
  @apiOperation("영화 상세 조회", "영화 상세를 조회한다.")
  @apiResponse(200, "영화 상세 조회", Movie)
  @apiResponse(404, "영화 상세 조회 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  @apiParam("id", true, "영화 아이디")
  getDetail(@Param("id") movieId: number) {
    return this.moviesService.getDetail(movieId);
  }
}

@controller("영화", "api/v1/movies")
export class CreateMovieController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @apiOperation("영화 생성", "영화를 생성.")
  @apiResponse(200, "영화 생성", Movie)
  @apiResponse(404, "영화 생성 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  @apiBody("영화를 생성한다.", CreateMovieDto)
  post(@Body() movieData: CreateMovieDto) {
    return this.moviesService.post(movieData);
  }
}

@controller("영화", "api/v1/movies")
export class DeleteMovieController {
  constructor(private readonly moviesService: MoviesService) {}

  @Delete(":id")
  @apiOperation("영화 삭제", "영화를 삭제한다.")
  @apiParam("id", true, "영화 아이디")
  @apiResponse(200, "영화 삭제", DeleteMovieDto)
  @apiResponse(404, "영화 삭제 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  delete(@Param("id") movieId: number) {
    return this.moviesService.delete(movieId);
  }
}

@controller("영화", "api/v1/movies")
export class PatchMoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Patch(":id")
  @apiOperation("영화 수정", "영화를 수정한다.")
  @apiResponse(200, "영화 수정", Movie)
  @apiResponse(404, "영화 수정 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  @apiBody("영화를 수정한다.", UpdateMovieDto)
  patch(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.patch(movieId, updateData);
  }
}
