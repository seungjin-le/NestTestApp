import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { UserEntity } from "./entities/user.entity";
import { Model } from "mongoose";
import { UserDocument } from "./user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>) {}

  async getAll({ page, limit }: { page: number; limit: number }) {
    try {
      const users: [] | UserEntity[] | any = await this.userModel
        .find()
        .skip(limit * (page - 1))
        .limit(limit)
        .exec();
      if (users.length === 0) throw new Error("유저 목록이 없습니다.");
      return users;
    } catch {
      throw new Error("유저 조회 실패");
    }
  }

  getDetail(id: number) {
    return `This action returns a #${id} user`;
  }

  patch(body: UpdateUserDto) {
    return `This action updates a user`;
  }

  postLogin(body: LoginUserDto) {
    return `This action removes a  user`;
  }

  async postJoin(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return {};
  }

  //   try {
  //     const user = await this.userModel.findOne({ email: createUserDto.email }).exec();
  //     if (user) throw new Error("이미 존재하는 이메일입니다.");
  //     const count = await this.userModel.countDocuments().exec();
  //     const newUser = new this.userModel({
  //       ...createUserDto,
  //       id: count + 1,
  //     });
  //     const savedUser = newUser.save();
  //     return savedUser;
  //   } catch {
  //     throw new Error("유저 생성 실패");
  //   }
  // }
}
