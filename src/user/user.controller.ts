import { Get, Post, Body, Patch, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { apiBody, apiOperation, apiResponse, controller } from "../utiltys/apiDecorators";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiParam, ApiQuery } from "@nestjs/swagger";
import { GetAllUserDto } from "./dto/getAll-user.dto";

@controller("user", "api/v1/user")
export class UserGetAllController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({ name: "page", type: Number, description: "페이지 번호" })
  @ApiQuery({ name: "size", type: Number, description: "페이지 사이즈" })
  @apiOperation("유저 조회", "유저 전체를 조회.")
  @apiResponse(200, "유저 전체 조회", GetAllUserDto)
  @apiResponse(404, "유저 전체 조회 실패", {})
  @apiResponse(500, "서버 에러", {})
  @apiResponse(400, "잘못된 요청", {})
  @apiResponse(401, "권한 없음", {})
  @apiResponse(403, "금지됨", {})
  @apiResponse(405, "허용되지 않음", {})
  getAll(@Query("page") page: number, @Query("size") limit: number) {
    return this.userService.getAll({ page, limit });
  }
}

@controller("user", "api/v1/user")
export class UserGetDetailController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  @ApiParam({ name: "id", type: Number, description: "유저 아이디" })
  @apiOperation("유저 상세 조회", "유저 상세를 조회.")
  @apiResponse(200, "유저 상세 조회", {})
  @apiResponse(404, "유저 상세 조회 실패", {})
  @apiResponse(500, "서버 에러", {})
  @apiResponse(400, "잘못된 요청", {})
  @apiResponse(401, "권한 없음", {})
  @apiResponse(403, "금지됨", {})
  @apiResponse(405, "허용되지 않음", {})
  getDetail(@Param("email") email: string) {
    return this.userService.getDetail(email);
  }
}

@controller("user", "api/v1/user")
export class UserPostJoinController {
  constructor(private readonly userService: UserService) {}

  @Post("join")
  @apiBody("유저 정보", CreateUserDto)
  postJoin(@Body() body: CreateUserDto) {
    return this.userService.postJoin(body);
  }
}

@controller("user", "api/v1/user")
export class UserPatchController {
  constructor(private readonly userService: UserService) {}

  @Patch("update")
  postJoin(@Body() body: UpdateUserDto) {
    return this.userService.patch(body);
  }
}
