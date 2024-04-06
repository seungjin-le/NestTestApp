import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class UserService {
  getAll({ page, limit }: { page: number; limit: number }) {
    return `${page} ${limit} This action returns all user`;
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

  postJoin(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }
}
