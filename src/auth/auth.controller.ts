import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { controller } from "../utiltys/apiDecorators";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { ApiBody } from "@nestjs/swagger";

@controller("Auth", "api/v1/auth")
export class AuthGetAllController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}

@controller("Auth", "api/v1/auth")
export class AuthPostLoginController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiBody({ type: LoginAuthDto })
  postLogin(@Body() body: LoginAuthDto) {
    return this.authService.postLogin(body);
  }
}

@controller("Auth", "api/v1/auth")
export class AuthPostJoinController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  findAll() {
    return this.authService.findAll();
  }
}
