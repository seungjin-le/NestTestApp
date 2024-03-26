import { Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { MembersService } from "./members.service";
import { apiOperation, apiResponse, controller } from "../utiltys/apiDecorators";
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
  @apiOperation("멤버 상세 조회", "멤버 상세를 조회한다.")
  @apiResponse(200, "멤버 상세 조회", Member)
  @apiResponse(404, "멤버 상세 조회 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  getDetail(@Param("id") id: number) {
    return this.membersService.getDetail(id);
  }
}

@controller("유저", "api/v1/users")
export class MembersDeleteController {
  constructor(private readonly membersService: MembersService) {}

  @Delete(":id")
  @apiOperation("멤버 삭제", "멤버를 삭제한다.")
  @apiResponse(200, "멤버 삭제", Member)
  @apiResponse(404, "멤버 삭제 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  delete(@Param("id") id: number) {
    return this.membersService.delete(id);
  }
}

@controller("유저", "api/v1/users")
export class MembersPostController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @apiOperation("멤버 생성", "멤버를 생성한다.")
  @apiResponse(200, "멤버 생성", Member)
  @apiResponse(404, "멤버 생성 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  post(memberData: Member) {
    return this.membersService.post(memberData);
  }
}

@controller("유저", "api/v1/users")
export class MembersPatchController {
  constructor(private readonly membersService: MembersService) {}

  @Patch(":id")
  @apiOperation("멤버 수정", "멤버를 수정한다.")
  @apiResponse(200, "멤버 수정", Member)
  @apiResponse(404, "멤버 수정 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  patch(@Param("id") id: number, memberData: Member) {
    return this.membersService.patch({ id, memberData });
  }
}
