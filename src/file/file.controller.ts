import { Body, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { apiOperation, apiResponse, controller } from "src/utiltys/apiDecorators";
import { ApiBody, ApiConsumes, ApiParam } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpLoadFileDto } from "./dto/upload.dto";
import { GetFileDto } from "./dto/get.dto";

@controller("File", "api/v1/file")
export class GetFileController {
  constructor(private readonly FileService: FileService) {}

  @Get(":key")
  @apiOperation("파일 가져오기", "파일 가져오기")
  @ApiParam({ name: "key", type: String, description: "S3 파일 키", example: "example-key-123" })
  @apiResponse(200, "성공")
  async getFiles(@Param("key") key: String) {
    return this.FileService.getFiles(key);
  }
}

// 파일 업로드
@controller("File", "api/v1/file")
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpLoadFileDto })
  @UseInterceptors(FileInterceptor("file"))
  @apiOperation("파일 업로드", "파일 업로드")
  @apiResponse(200, " 성공")
  @apiResponse(400, "실패")
  @apiResponse(401, "권한 없음")
  @apiResponse(403, "금지됨")
  @apiResponse(405, "허용되지 않음")
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.FileService.uploadFile(file);
  }
}

@controller("File", "api/v1/file")
export class FileDownloadController {
  constructor(private readonly FileService: FileService) {}

  @Post("download")
  async downloadFile(@Body() { key }) {
    return this.FileService.downloadFile(key);
  }
}

// 파일 삭제
@controller("File", "api/v1/file")
export class FileDeleteController {
  constructor(private readonly FileService: FileService) {}

  @Post("delete")
  async deleteFile(@Body() { key }) {
    return this.FileService.deleteFile(key);
  }
}

// 파일 수정
@controller("File", "api/v1/file")
export class FileUpdateController {
  constructor(private readonly FileService: FileService) {}

  @Post("update")
  async updateFile(@Body() { key, newFileName }) {
    return this.FileService.updateFile(key, newFileName);
  }
}
