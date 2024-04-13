import { Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TokenAuthDto } from "./dto/token-auth.dto";
import { apiOperation, apiResponse, controller } from "../utiltys/apiDecorators";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { ApiBody } from "@nestjs/swagger";

@controller("Auth", "api/v1/auth")
export class AuthPostLoginController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @apiOperation("로그인", "로그인")
  @ApiBody({ type: LoginAuthDto })
  @apiResponse(200, "로그인 성공", TokenAuthDto)
  postLogin(@Body() body: LoginAuthDto) {
    return this.authService.postLogin(body);
  }
}

@controller("Auth", "api/v1/auth")
export class AuthPostRefreshController {
  constructor(private readonly authService: AuthService) {}

  @Post("refresh")
  @apiOperation("토큰 갱신", "토큰 갱신")
  @ApiBody({ type: TokenAuthDto })
  @apiResponse(200, "토큰 갱신 성공", TokenAuthDto)
  @apiResponse(400, "토큰 갱신 실패", {})
  @apiResponse(401, "권한 없음", {})
  @apiResponse(403, "금지됨", {})
  @apiResponse(405, "허용되지 않음", {})
  @apiResponse(500, "서버 에러", {})
  postRefresh(@Body() body: TokenAuthDto) {
    return this.authService.postRefresh(body);
  }
}
