import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { controller } from "../utiltys/apiDecorators";
import { LoginAuthDto } from "./dto/login-auth.dto";

@controller("auth", "Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}

@controller("auth", "Auth")
export class AuthPostLoginController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  postLogin(@Body() body: LoginAuthDto) {
    return this.authService.postLogin(body);
  }
}

@controller("auth", "Auth")
export class AuthPostJoinController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  findAll() {
    return this.authService.findAll();
  }
}
