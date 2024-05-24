import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { File } from "./entities/file.entity";
import { Model } from "mongoose";
import { FileDocument } from "./file.schema";

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private readonly fileModel: Model<FileDocument>) {}

  async uploadFile(file: File) {
    console.log(file);
    return {
      data: "file data",
    };
  }

  async downloadFile(key: string) {
    return this.fileModel.findOne({ key });
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
