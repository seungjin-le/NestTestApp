import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Member } from "./entities/Members.entity";
import { MemberDocument } from "./members.schema";

@Injectable()
export class MembersService {
  constructor( @InjectModel( Member.name ) private readonly membersModel: Model<MemberDocument> ) {
  }

  async getAll( { page, size } ): Promise<Member[] | unknown> {
    try {
      return await this.membersModel
        .find()
        .skip( size * (page - 1) )
        .limit( size )
        .exec();
    } catch( e ) {
      throw new NotFoundException( "멤버 목록이 없습니다." );
    }
  }

  async getDetail( id: number ): Promise<Member | unknown> {
    try {
      return await this.membersModel.find( { id } ).exec();
    } catch( e ) {
      throw new NotFoundException( "멤버 목록이 없습니다." );
    }
  }

  async post( memberData: Member ): Promise<Member | unknown> {
    try {
      const count = await this.membersModel.countDocuments().exec();
      const newMember = new this.membersModel( {
        ...memberData,
        id : count + 1,
      } );
      const savedMember = await newMember.save();
      return savedMember.toObject() as Member;
    } catch( e ) {
      console.error( e );
      throw new Error( "멤버 생성 실패" );
    }
  }

  async patch( { id, memberData }: { id: number; memberData: Member } ): Promise<Member | unknown> {
    try {
      await this.membersModel.updateOne( { id }, { $set : memberData } ).exec();
      return this.getDetail( id );
    } catch( e ) {
      throw new Error( "멤버 수정 실패" );
    }
  }

  async postSignUp( { id, memberData }: { id: number; memberData: Member } ): Promise<Member | unknown> {
    try {
      await this.membersModel.updateOne( { id }, {
        $push : {
          join : memberData,
        },
      } ).exec();
    }
  }
}
