import { Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { RefreshAuthDto } from "./dto/refresh-auth.dto";
import { Response } from "express";
import { Model } from "mongoose";
import { AuthDocument } from "./auth.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectModel("Auth") private authModel: Model<AuthDocument>
  ) {}

  // Refresh 토큰 생성
  createRefreshToken(payload: { email: string; sub: number }) {
    return this.jwtService.sign(payload, { expiresIn: "7d" });
  }

  // Access 토큰 생성
  createAccessToken(payload: { email: string; sub: number }) {
    return this.jwtService.sign(payload, { expiresIn: "1h" });
  }

  // 토큰 저장
  async saveToken(email: string, token: { accessToken: string; refreshToken: string }) {
    const checked = await this.authModel.findOne({ email });
    if (checked) {
      await this.authModel.updateOne({ email }, { ...token });
    } else {
      await this.authModel.create({ email, ...token });
    }
  }

  // 토큰 확인
  async checkedToken(refreshToken: string) {
    console.log("test", refreshToken);
    try {
      const token = await this.authModel.findOne({ refreshToken });
      if (!token) return false;
      const payload = this.jwtService.verify(refreshToken);
      return !!payload;
    } catch {
      return false;
    }
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
      return res.status(400).send({
        status: 400,
        message: "토큰 갱신 실패",
        data: {},
      });
    }
  }

  // 로그인
  async postLogin(req: LoginAuthDto, res: Response): Promise<any> {
    try {
      console.log(req);
      const user = await this.usersService.getDetail(req.email, res);

      if (!user) {
        return res.status(400).send({
          status: 400,
          message: "일치하는 유저가 없습니다.",
        });
      }

      const checkPassword = await bcrypt.compare(req.password, user.password);

      if (!checkPassword) {
        return res.status(400).send({
          status: 400,
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
      }

      const payload = { email: user.email, sub: user.id };
      const token = {
        accessToken: await this.jwtService.signAsync(payload, { expiresIn: "1h" }),
        refreshToken: await this.jwtService.signAsync(payload, { expiresIn: "7d" }),
      };

      await this.saveToken(user.email, token);

      return res.status(200).send({
        status: 200,
        message: "로그인 성공",
        data: token,
      });
    } catch (e) {
      if (!res.headersSent) {
        return res.status(400).send({
          status: 400,
          message: "로그인 실패",
        });
      }
    }
  }
}
