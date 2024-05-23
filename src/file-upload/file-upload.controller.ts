import { Body, Controller, Post, UploadedFile } from "@nestjs/common";
import { FileService } from "./file-upload.service";

// 파일 업로드
@Controller("api/v1/file-upload")
export class FileUploadController {
  constructor(private readonly FileService: FileService) {}

  @Post("upload")
  async uploadFile(@UploadedFile() file) {
    return this.FileService.uploadFile(file);
  }
}

@Controller("api/v1/file-download")
export class FileDownloadController {
  constructor(private readonly FileService: FileService) {}
  @Post("download")
  async downloadFile(@Body() { key }) {
    return this.FileService.downloadFile(key);
  }
}

// 파일 삭제
@Controller("api/v1/file-delete")
export class FileDeleteController {
  constructor(private readonly FileService: FileService) {}
  @Post("delete")
  async deleteFile(@Body() { key }) {
    return this.FileService.deleteFile(key);
  }
}

// 파일 수정
@Controller("api/v1/file-update")
export class FileUpdateController {
  constructor(private readonly FileService: FileService) {}
  @Post("update")
  async updateFile(@Body() { key, newFileName }) {
    return this.FileService.uodateFile(key, newFileName);
  }
}
