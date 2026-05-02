import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "@/user/dto/create-user.dto";
import { UpdateUserDto } from "@/user/dto/update-user.dto";
import { Model } from "mongoose";
import { USER_MODEL_NAME, UserDocument } from "@/user/user.schema";

import * as bcrypt from "bcrypt";

type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

@Injectable()
export class UserService {
  constructor(@InjectModel(USER_MODEL_NAME) private readonly userModel: Model<UserDocument>) {}

  /**
   * @description 유저 전체 조회
   * @param page number 페이지 번호
   * @param limit number 페이지 당 유저 수
   * @returns 유저 목록 응답
   */
  async getAll(page: number, limit: number): Promise<ApiResponse<UserDocument[]>> {
    try {
      const safePage = Math.max(Number(page) || 1, 1);
      const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);
      const users = await this.userModel
        .find()
        .select("-password")
        .skip(safeLimit * (safePage - 1))
        .limit(safeLimit)
        .exec();

      if (users.length === 0)
        throw new NotFoundException({ status: 404, message: "유저 목록이 없습니다." });

      return {
        status: 200,
        message: "유저 목록 조회 성공",
        data: users,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({ status: 500, message: "서버 에러" });
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select("+password").exec();
  }

  async getDetail(email: string): Promise<ApiResponse<UserDocument>> {
    try {
      const user = await this.userModel.findOne({ email }).select("-password").exec();

      if (!user) throw new NotFoundException({ status: 404, message: "유저 조회 실패" });

      return {
        status: 200,
        message: "유저 조회 성공",
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({ status: 500, message: "서버 에러" });
    }
  }

  /**
   * @description 유저 정보 수정
   * @param body UpdateUserDto 유저 정보 수정 요청 바디
   * @returns 유저 정보 수정 성공 메시지
   */
  async patch(_body: UpdateUserDto): Promise<ApiResponse<Record<string, never>>> {
    return {
      status: 200,
      message: "유저 정보 수정 성공",
      data: {},
    };
  }

  // 회원가입
  async postJoin(body: CreateUserDto): Promise<ApiResponse<Record<string, never>>> {
    try {
      const user = await this.userModel.findOne({ email: body.email });

      if (user)
        throw new BadRequestException({ status: 400, message: "이미 존재하는 이메일입니다." });

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
        data: {},
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({ status: 400, message: "회원가입 실패" });
    }
  }
}
