import { Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TokenAuthDto } from "./dto/token-auth.dto";
import { apiOperation, apiResponse, controller } from "../utiltys/apiDecorators";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { ApiBody } from "@nestjs/swagger";
import { RefreshAuthDto } from "./dto/refresh-auth.dto";
import { Response } from "express";

@controller("Auth", "api/v1/auth")
export class AuthPostLoginController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @apiOperation("로그인", "로그인")
  @ApiBody({ type: LoginAuthDto })
  @apiResponse(200, "로그인 성공", TokenAuthDto)
  @apiResponse(400, "로그인 실패")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  postLogin(@Body() req: LoginAuthDto, @Res() res: Response) {
    return this.authService.postLogin(req, res);
  }
}

@controller("Auth", "api/v1/auth")
export class AuthPostRefreshController {
  constructor(private readonly authService: AuthService) {}

  @Post("refresh")
  @apiOperation("토큰 갱신", "토큰 갱신")
  @ApiBody({ type: RefreshAuthDto })
  @apiResponse(200, "토큰 갱신 성공", TokenAuthDto)
  @apiResponse(400, "토큰 갱신 실패")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  @apiResponse(500, "서버 에러")
  postRefresh(@Body() req: RefreshAuthDto, @Res() res: Response) {
    return this.authService.postRefresh(req, res);
  }
}
