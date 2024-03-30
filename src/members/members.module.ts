import { Module } from "@nestjs/common";
import { MembersService } from "./members.service";
import {
  MembersController,
  MembersDetailController,
  MembersPatchController,
  MembersPostController,
} from "./members.controller";
import MembersSchema from "./members.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Member } from "./entities/Members.entity";

@Module({
  imports: [MongooseModule.forFeature([{ name: Member.name, schema: MembersSchema.schema }])],
  controllers: [MembersController, MembersDetailController, MembersPatchController, MembersPostController],
  providers: [MembersService, MembersSchema],
})
export class MembersModule {}
