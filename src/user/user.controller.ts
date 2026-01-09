import { Get, Post, Body, Patch, Param, Query, Res } from "@nestjs/common";
import { UserService } from "@/user/user.service";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { UpdateUserDto } from "@/user/dto/update-user.dto";
import { apiBody, apiOperation, apiResponse, controller } from "@/utils/apiDecorators";
import { ApiParam, ApiQuery } from "@nestjs/swagger";
import { GetAllUserDto } from "@/user/dto/getAll-user.dto";
import { Response } from "express";
import { GetDetailUserDto } from "@/user/dto/getDetail-user-dto";

@controller("User", "api/v1/user")
export class UserGetAllController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({ name: "page", type: Number, description: "페이지 번호" })
  @ApiQuery({ name: "size", type: Number, description: "페이지 사이즈" })
  @apiOperation("유저 조회", "유저 전체를 조회.")
  @apiResponse(200, "유저 전체 조회", GetAllUserDto)
  @apiResponse(404, "유저 전체 조회 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  getAll(@Query("page") page: number, @Query("size") limit: number, @Res() res: Response) {
    return this.userService.getAll(page, limit, res);
  }
}

/**
 * @description 유저 상세 조회 컨트롤러
 * @class UserGetDetailController
 * @param userService 유저 서비스
 */
@controller("User", "api/v1/user")
export class UserGetDetailController {
  constructor(private readonly userService: UserService) {}

  @Get(":email")
  @ApiParam({ name: "email", type: String, description: "유저 이메일" })
  @apiOperation("유저 상세 조회", "유저 상세를 조회.")
  @apiResponse(200, "유저 상세 조회", GetDetailUserDto)
  @apiResponse(404, "유저 상세 조회 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  getDetail(@Param("email") email: string, @Res() res: Response) {
    return this.userService.getDetail(email, res);
  }
}

@controller("User", "api/v1/user")
export class UserPostJoinController {
  constructor(private readonly userService: UserService) {}

  @Post("join")
  @apiBody("유저 정보", CreateUserDto)
  @apiOperation("회원가입", "회원가입")
  @apiResponse(200, "회원가입 성공")
  @apiResponse(400, "회원가입 실패")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  postJoin(@Body() body: CreateUserDto, @Res() res: Response) {
    return this.userService.postJoin(body, res);
  }
}

@controller("User", "api/v1/user")
export class UserPatchController {
  constructor(private readonly userService: UserService) {}

  @Patch("update")
  @apiBody("유저 정보", UpdateUserDto)
  @apiOperation("회원정보 수정", "회원정보 수정")
  @apiResponse(200, "회원정보 수정 성공")
  @apiResponse(400, "회원정보 수정 실패")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  postJoin(@Body() body: UpdateUserDto, @Res() res: Response) {
    return this.userService.patch(body, res);
  }
}
