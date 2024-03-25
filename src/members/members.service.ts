import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Member } from "./entities/Members.entity";
import { MemberDocument } from "./members.schema";

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private readonly membersModel: Model<MemberDocument>) {}

  async getAll({ page, size }): Promise<Member[] | unknown> {
    try {
      return await this.membersModel
        .find()
        .skip(size * (page - 1))
        .limit(size)
        .exec();
    } catch (e) {
      throw new NotFoundException("멤버 목록이 없습니다.");
    }
  }
}
