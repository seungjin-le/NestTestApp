import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { UserEntity } from "./entities/user.entity";
import { Model } from "mongoose";
import { UserDocument } from "./user.schema";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class UserService {
  constructor(@InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>) {}

  // 유저 전체 조회
  async getAll(page: number, limit: number, res: Response) {
    try {
      const users: [] | UserEntity[] | any = await this.userModel
        .find()
        .skip(limit * (page - 1))
        .limit(limit)
        .exec();
      if (users.length === 0) return res.status(404).send({ status: 404, message: "유저 목록이 없습니다." });
      return users;
    } catch {
      res.status(500).send({ status: 500, message: "서버 에러" });
    }
  }

  // 유저 상세 조회
  async getDetail(email: string, res?: Response): Promise<UserDocument> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) res.status(404).send({ status: 404, message: "유저 조회 실패" });
      return user;
    } catch (error) {
      res.status(500).send({ status: 500, message: "서버 에러" });
    }
  }

  // 유저 정보 수정
  patch(body: UpdateUserDto) {
    return `This action updates a user`;
  }

  // 회원가입
  async postJoin(body: CreateUserDto) {
    console.log(body);
    try {
      const user = await this.userModel.findOne({ email: body.email });

      if (user)
        return {
          status: 400,
          message: "이미 존재하는 이메일입니다.",
        };
      const hashedPassword: string = await bcrypt.hash(body.password, 10);
      const id: number = await this.userModel.countDocuments();

      await this.userModel.create({
        id: id + 1,
        email: body.email,
        password: hashedPassword,
  
      });
      return {
        status: 200,
        message: "회원가입 성공",
      };
    } catch (error) {
      throw new Error("회원가입 실패");
    }
  }
}
