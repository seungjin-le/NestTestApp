import { Body, Controller, Post, UploadedFile } from "@nestjs/common";
import { FileService } from "./file.service";
import { apiOperation, apiResponse, controller } from "src/utiltys/apiDecorators";
import { ApiBody } from "@nestjs/swagger";
import { UpLoadFileDto } from "./dto/upload.dto";

// 파일 업로드
@controller("File", "api/v1/file-upload")
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @Post("upload")
  @apiOperation("로그인", "로그인")
  @ApiBody({ type: UpLoadFileDto })
  @apiResponse(200, " 성공", {})
  async uploadFile(@UploadedFile() file) {
    return this.FileService.uploadFile(file);
  }
}

@controller("File", "api/v1/file-download")
export class FileDownloadController {
  constructor(private readonly FileService: FileService) {}

  @Post("download")
  async downloadFile(@Body() { key }) {
    return this.FileService.downloadFile(key);
  }
}

// 파일 삭제
@controller("File", "api/v1/file-delete")
export class FileDeleteController {
  constructor(private readonly FileService: FileService) {}

  @Post("delete")
  async deleteFile(@Body() { key }) {
    return this.FileService.deleteFile(key);
  }
}

// 파일 수정
@controller("File", "api/v1/file-update")
export class FileUpdateController {
  constructor(private readonly FileService: FileService) {}

  @Post("update")
  async updateFile(@Body() { key, newFileName }) {
    return this.FileService.uodateFile(key, newFileName);
  }
}
