import { Injectable } from "@nestjs/common";

@Injectable()
export class FileService {
  constructor() {}

  async uploadFile(file: any) {
    return {
      name: file.originalname,
      path: file.location,
      size: file.size,
    };
  }

  async deleteFile(key: string) {
    return {
      key,
    };
  }

  async uodateFile(key: string, newFileName: string) {
    return {
      key,
      newFileName,
    };
  }
}
