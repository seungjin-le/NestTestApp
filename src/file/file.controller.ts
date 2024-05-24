import { Body, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { apiOperation, apiResponse, controller } from "src/utiltys/apiDecorators";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpLoadFileDto } from "./dto/upload.dto";

// 파일 업로드
@controller("File", "api/v1/file")
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @apiOperation("파일 업로드", "파일 업로드")
  @ApiBody({ type: UpLoadFileDto })
  @UseInterceptors(FileInterceptor("file"))
  @apiResponse(200, " 성공")
  async uploadFile(@UploadedFile() file: any) {
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
    return this.FileService.uodateFile(key, newFileName);
  }
}
