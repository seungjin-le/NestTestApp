import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { apiOperation, apiResponse, controller } from "../utiltys/apiDecorators";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiBody, ApiParam } from "@nestjs/swagger";
import { GetAllUserDto } from "./dto/getAll-user.dto";

@controller("user", "User")
export class UserGetAllController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiParam({ name: "page", type: Number })
  @ApiParam({ name: "size", type: Number })
  @apiOperation("유저 조회", "유저 전체를 조회.")
  @apiResponse(200, "유저 전체 조회", GetAllUserDto)
  @apiResponse(404, "유저 전체 조회 실패", {})
  @apiResponse(500, "서버 에러", {})
  @apiResponse(400, "잘못된 요청", {})
  @apiResponse(401, "권한 없음", {})
  @apiResponse(403, "금지됨", {})
  @apiResponse(405, "허용되지 않음", {})
  getAll(@Param("page") page: number, @Param("size") limit: number) {
    return this.userService.getAll({ page, limit });
  }
}

@controller("user", "User")
export class UserGetDetailController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  getDetail(@Param("id") id: number) {
    return this.userService.getDetail(id);
  }
}

@controller("user", "User")
export class UserPostLoginController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  postLogin(@Body() body: LoginUserDto) {
    return this.userService.postLogin(body);
  }
}

@controller("user", "User")
export class UserPostJoinController {
  constructor(private readonly userService: UserService) {}

  @Post("join")
  @ApiBody({ type: CreateUserDto })
  postJoin(@Body() body: CreateUserDto) {
    return this.userService.postJoin(body);
  }
}

@controller("user", "User")
export class UserPatchController {
  constructor(private readonly userService: UserService) {}

  @Patch("update")
  postJoin(@Body() body: UpdateUserDto) {
    return this.userService.patch(body);
  }
}
