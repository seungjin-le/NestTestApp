import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { UserEntity } from "./entities/user.entity";
import { Model } from "mongoose";
import { UserDocument } from "./user.schema";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}

  async getAll({ page, limit }: { page: number; limit: number }) {
    try {
      const users: [] | UserEntity[] | any = await this.userModel
        .find()
        .skip(limit * (page - 1))
        .limit(limit)
        .exec();
      if (users.length === 0) return new Error("유저 목록이 없습니다.");
      return users;
    } catch {
      throw new Error("유저 조회 실패");
    }
  }

  getDetail(email: string): Promise<UserDocument> {
    try {
      return this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new Error("유저 조회 실패");
    }
  }

  patch(body: UpdateUserDto) {
    return `This action updates a user`;
  }

  async postJoin(body: CreateUserDto) {
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
        nickName: body.nickName,
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
