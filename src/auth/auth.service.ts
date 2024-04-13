import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return "This action adds a new auth";
  }

  findAll() {
    return `This action returns all auth`;
  }

  async postLogin(body: LoginAuthDto) {
    try {
      const user = await this.usersService.getDetail(body.email);

      if (!user) new Error("해당하는 유저가 없습니다.");
      const checkPassword = await bcrypt.compare(body.password, user.password);
      if (!checkPassword) return new Error("비밀번호가 일치하지 않습니다.");
      const payload = { email: user.email, sub: user.id };

      return {
        status: 200,
        message: "로그인 성공",
        data: {
          accessToken: await this.jwtService.signAsync(payload),
          refreshToken: await this.jwtService.signAsync(payload),
        },
      };
    } catch {
      throw new Error("로그인 실패");
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
