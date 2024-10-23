import { Injectable } from "@nestjs/common";
import { CreatePostUserDto } from "./dto/create-post_user.dto";
import { UpdatePostUserDto } from "./dto/update-post_user.dto";

@Injectable()
export class PostUserService {
  create(createPostUserDto: CreatePostUserDto) {
    return "This action adds a new postUser";
  }

  findPostUserAll(page: number, limit: number, res: Response) {
    return `This action returns all postUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postUser`;
  }

  update(id: number, updatePostUserDto: UpdatePostUserDto) {
    return `This action updates a #${id} postUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} postUser`;
  }
}
