import { Body, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/Movie.entity";
import { DeleteMovieDto } from "./dto/delete-movie.dto";
import { apiOperation, apiParam, apiQuery, apiBody, apiResponse, controller } from "@/utils/apiDecorators";
import { Response } from "express";

/**
 * 영화 컨트롤러 클래스
 * 영화 관련 API 엔드포인트를 정의한다.
 */
@controller("영화", "api/v1/movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  /**
   * 영화 전체 목록 조회
   * @param page 페이지 번호
   * @param size 페이지 사이즈
   * @param res 응답 객체
   * @returns 영화 목록
   */
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

/**
 * 영화 상세 조회 컨트롤러 클래스
 * 특정 영화의 상세 정보를 조회하는 API 엔드포인트를 정의한다.
 */
@controller("영화", "api/v1/movies")
export class GetDetailMovieController {
  constructor(private readonly moviesService: MoviesService) {}

  /**
   * 영화 상세 조회
   * @param movieId 영화 아이디
   * @returns 영화 상세 정보
   */
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

/**
 * 영화 생성 컨트롤러 클래스
 * 새로운 영화를 생성하는 API 엔드포인트를 정의한다.
 */
@controller("영화", "api/v1/movies")
export class CreateMovieController {
  constructor(private readonly moviesService: MoviesService) {}

  /**
   * 영화 생성
   * @param movieData 생성할 영화 데이터
   * @returns 생성된 영화 정보
   */
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

/**
 * 영화 삭제 컨트롤러 클래스
 * 특정 영화를 삭제하는 API 엔드포인트를 정의한다.
 */
@controller("영화", "api/v1/movies")
export class DeleteMovieController {
  constructor(private readonly moviesService: MoviesService) {}

  /**
   * 영화 삭제
   * @param movieId 영화 아이디
   * @returns 삭제된 영화 정보
   */
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

/**
 * 영화 수정 컨트롤러 클래스
 * 특정 영화를 수정하는 API 엔드포인트를 정의한다.
 */
@controller("영화", "api/v1/movies")
export class PatchMoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  /**
   * 영화 수정
   * @param movieId 영화 아이디
   * @param updateData 수정할 영화 데이터
   * @returns 수정된 영화 정보
   */
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