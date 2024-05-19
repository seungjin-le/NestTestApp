import { Body, Controller, Post, UploadedFile } from "@nestjs/common";
import { FileService } from "./file-upload.service";

@Controller("api/v1/file-upload")
export class FileUploadController {
  constructor(private readonly FileService: FileService) {}

  @Post("upload")
  async uploadFile(@UploadedFile() file) {
    return this.FileService.uploadFile(file);
  }
}

@Controller("api/v1/file-delete")
export class FileDeleteController {
  constructor(private readonly FileService: FileService) {}
  @Post("delete")
  async deleteFile(@Body() { key }) {
    return this.FileService.deleteFile(key);
  }
}

@Controller("api/v1/file-update")
export class FileUpdateController {
  constructor(private readonly FileService: FileService) {}
  @Post("update")
  async updateFile(@Body() { key, newFileName }) {
    return this.FileService.uodateFile(key, newFileName);
  }
}
