import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Member } from "./entities/Members.entity";
import { MemberDocument } from "./members.schema";

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private readonly membersModel: Model<MemberDocument>) {}
  private members: Member[] = [];

  async getAll({ page, size }): Promise<Member[]> {
    try {
      const members: any = await this.membersModel.find().exec();

      return members;
    } catch (e) {
      throw new NotFoundException("영화 목록이 없습니다.");
    }
  }
}
