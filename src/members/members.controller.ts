import { Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { MembersService } from "./members.service";
import { controller } from "../utiltys/apiDecorators";
import { Member } from "./entities/Members.entity";

@controller("유저", "api/v1/users")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  getAll(@Query("page") page: number, @Query("size") size: number) {
    return this.membersService.getAll({ page: 1, size: 10 });
  }
}

@controller("유저", "api/v1/users")
export class MembersDetailController {
  constructor(private readonly membersService: MembersService) {}

  @Get(":id")
  getDetail(@Param("id") id: number) {
    return this.membersService.getDetail(id);
  }
}

@controller("유저", "api/v1/users")
export class MembersDeleteController {
  constructor(private readonly membersService: MembersService) {}

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.membersService.delete(id);
  }
}

@controller("유저", "api/v1/users")
export class MembersPostController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  post(memberData: Member) {
    return this.membersService.getAll({ page: 1, size: 10 });
  }
}

@controller("유저", "api/v1/users")
export class MembersPatchController {
  constructor(private readonly membersService: MembersService) {}

  @Patch(":id")
  patch(query: { id: number; memberData: Member }) {
    return this.membersService.getAll({ page: 1, size: 10 });
  }
}
