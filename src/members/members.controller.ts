import { Body, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { MembersService } from "./members.service";
import { apiOperation, apiResponse, controller } from "../utiltys/apiDecorators";
import { Member } from "./entities/Members.entity";
import { UpdateMembersDto } from "./dto/update-members.dto";
import { CreateMembersDto } from "./dto/create-members.dto";
import { LoginMembersDto } from "./dto/login-members.dto";

@controller("유저", "api/v1/users")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @apiOperation("멤버 전체 조회", "멤버 전체를 조회한다.")
  @apiResponse(200, "멤버 전체 조회", Member)
  @apiResponse(404, "멤버 전체 조회 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
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
export class MembersPostLoginController {
  constructor(private readonly membersService: MembersService) {}

  @Post("/login")
  @apiOperation("멤버 로그인", "멤버를 로그인한다.")
  @apiResponse(200, "멤버 로그인", CreateMembersDto)
  @apiResponse(404, "멤버 로그인 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  post(@Body() memberData: LoginMembersDto) {
    return this.membersService.postLogin(memberData);
  }
}

@controller("유저", "api/v1/users")
export class MembersPostController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @apiOperation("멤버 생성", "멤버를 생성한다.")
  @apiResponse(200, "멤버 생성", CreateMembersDto)
  @apiResponse(404, "멤버 생성 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  post(@Body() memberData: Member) {
    return this.membersService.postSingUp(memberData);
  }
}

@controller("유저", "api/v1/users")
export class MembersPatchController {
  constructor(private readonly membersService: MembersService) {}

  @Patch(":id")
  @apiOperation("멤버 수정", "멤버를 수정한다.")
  @apiResponse(200, "멤버 수정", UpdateMembersDto)
  @apiResponse(404, "멤버 수정 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  patch(@Param("id") id: number, @Body() memberData: Member) {
    return this.membersService.patch({ id, memberData });
  }
}
