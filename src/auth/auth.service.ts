import { Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { RefreshAuthDto } from "./dto/refresh-auth.dto";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  // Refresh 토큰 생성
  createRefreshToken(payload: { email: string; sub: number }) {
    return this.jwtService.sign(payload, { expiresIn: "7d" });
  }

  // Access 토큰 생성
  createAccessToken(payload: { email: string; sub: number }) {
    return this.jwtService.sign(payload, { expiresIn: "20s" });
  }

  // 토큰 갱신
  async postRefresh(req: RefreshAuthDto, res: Response) {
    try {
      const user = this.jwtService.verify(req.refreshToken);
      const payload = { email: user.email, sub: user.sub };
      return res.status(200).send({
        status: 200,
        message: "토큰 갱신 성공",
        data: {
          accessToken: this.createAccessToken(payload),
          refreshToken: this.createRefreshToken(payload),
        },
      });
    } catch (error) {
      return res.status(400).send({ message: "토큰 갱신 실패" });
    }
  }

  // 로그인
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
          accessToken: this.createAccessToken(payload),
          refreshToken: this.createRefreshToken(payload),
        },
      };
    } catch {
      throw new Error("로그인 실패");
    }
  }
}
