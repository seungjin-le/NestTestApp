import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserEntity } from "@/user/entities/user.entity";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { UpdateUserDto } from "@/user/dto/update-user.dto";
import { Model } from "mongoose";
import { UserDocument } from "@/user/user.schema";

import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class UserService {
  constructor(@InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>) {}

  // 유저 전체 조회
  async getAll(page: number, limit: number, res: Response): Promise<any> {
    try {
      const users: [] | UserEntity[] | any = await this.userModel
        .find()
        .skip(limit * (page - 1))
        .limit(limit)
        .exec();

      if (users.length === 0) return res.status(404).send({ status: 404, message: "유저 목록이 없습니다." });
      return res.status(200).send({
        status: 200,
        message: "유저 목록 조회 성공",
        data: users,
      });
    } catch {
      res.status(500).send({ status: 500, message: "서버 에러" });
    }
  }

  // 유저 상세 조회
  async getDetail(email: string, res?: Response): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) res.status(404).send({ status: 404, message: "유저 조회 실패" });

      if (!res) return user;

      return res.status(200).send({
        status: 200,
        message: "유저 조회 성공",
        data: user,
      });
    } catch (error) {
      res.status(500).send({ status: 500, message: "서버 에러" });
    }
  }

  // 유저 정보 수정
  async patch(body: UpdateUserDto, res: Response): Promise<any> {
    return res.status(200).send({
      status: 200,
      message: "유저 정보 수정 성공",
      data: {},
    });
  }

  // 회원가입
  async postJoin(body: CreateUserDto, res: Response): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email: body.email });

      if (user)
        return res.status(400).send({
          status: 400,
          message: "이미 존재하는 이메일입니다.",
        });
      const hashedPassword: string = await bcrypt.hash(body.password, 10);
      const id: number = await this.userModel.countDocuments();

      await this.userModel.create({
        id: id + 1,
        email: body.email,
        password: hashedPassword,
      });
      return res.status(200).send({
        status: 200,
        message: "회원가입 성공",
        data: {},
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: "회원가입 실패",
      });
    }
  }
}
