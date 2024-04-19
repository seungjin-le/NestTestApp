import { Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { RefreshAuthDto } from "./dto/refresh-auth.dto";
import { Response } from "express";
import { Model } from "mongoose";
import { AuthDocument } from "./auth.schema";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private authModel: Model<AuthDocument>
  ) {}

  // Refresh 토큰 생성
  createRefreshToken(payload: { email: string; sub: number }) {
    return this.jwtService.sign(payload, { expiresIn: "7d" });
  }

  // Access 토큰 생성
  createAccessToken(payload: { email: string; sub: number }) {
    return this.jwtService.sign(payload, { expiresIn: "20s" });
  }

  async saveToken(payload: { email: string; refreshToken: string }) {
    return await this.authModel.create(payload);
  }

  // 토큰 확인
  async tokenCheck(email: string) {
    await this.authModel.findOne({ email }).exec();
  }

  // 토큰 갱신
  async postRefresh(req: RefreshAuthDto, res: Response) {
    try {
      const user = this.jwtService.verify(req.refreshToken);
      const check = await this.tokenCheck(user.email);
      if (!user || !check) {
        return res.status(400).send({
          status: 400,
          message: "토큰이 유효하지 않습니다.",
        });
      }
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
      return res.status(400).send({
        status: 400,
        message: "토큰 갱신 실패",
      });
    }
  }

  // 로그인
  async postLogin(req: LoginAuthDto, res: Response) {
    try {
      const user = await this.usersService.getDetail(req.email);
      if (!user)
        return res.status(400).send({
          status: 400,
          message: "일치하는 유저가 없습니다.",
        });
      const checkPassword = await bcrypt.compare(req.password, user.password);
      if (!checkPassword)
        return res.status(400).send({
          status: 400,
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });

      await this.saveToken({ email: user.email, sub: user.id });
      const payload = { email: user.email, sub: user.id };

      return res.status(200).send({
        status: 200,
        message: "로그인 성공",
        data: {
          accessToken: this.createAccessToken(payload),
          refreshToken: this.createRefreshToken(payload),
        },
      });
    } catch {
      return res.status(400).send({
        status: 400,
        message: "로그인 실패",
      });
    }
  }
}
