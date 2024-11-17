import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from "@nestjs/common";
import { PostUserService } from "./post_user.service";
import { CreatePostUserDto } from "./dto/create-post_user.dto";
import { UpdatePostUserDto } from "./dto/update-post_user.dto";
import { apiOperation, apiResponse, controller } from "@/utils/apiDecorators";
import { ApiQuery } from "@nestjs/swagger";
import { GetAllUserDto } from "@/user/dto/getAll-user.dto";

@Controller("post-user")
export class PostUserController {
  constructor(private readonly postUserService: PostUserService) {}

  @Post()
  create(@Body() createPostUserDto: CreatePostUserDto) {
    return this.postUserService.create(createPostUserDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postUserService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostUserDto: UpdatePostUserDto) {
    return this.postUserService.update(+id, updatePostUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postUserService.remove(+id);
  }
}
@controller("PostUser", "api/v1/post-user")
export class PostUserGetAllController {
  constructor(private readonly postUserService: PostUserService) {}

  @Get()
  @ApiQuery({ name: "page", type: Number, description: "페이지 번호" })
  @ApiQuery({ name: "size", type: Number, description: "페이지 사이즈" })
  @apiOperation("유저 조회", "유저 전체를 조회.")
  @apiResponse(200, "유저 전체 조회", GetAllUserDto)
  @apiResponse(404, "유저 전체 조회 실패")
  @apiResponse(500, "서버 에러")
  @apiResponse(400, "잘못된 요청")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  getAll(@Query("page") page: number, @Query("size") limit: number, @Res() res: Response) {
    return this.postUserService.findPostUserAll(page, limit, res);
  }
}
