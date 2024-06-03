import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { File } from "./entities/file.entity";
import { Model } from "mongoose";
import { FileDocument } from "./file.schema";
import * as AWS from "aws-sdk";

@Injectable()
export class FileService {
  private readonly s3;

  constructor(@InjectModel(File.name) private readonly fileModel: Model<FileDocument>) {
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.s3 = new AWS.S3();
  }

  async getFiles(key: any) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };

    // return new Promise((resolve, reject) => {
    //   this.s3.getObject(params, (err, data) => {
    //     console.log(data);
    //     if (err) reject(err);
    //     resolve(data);
    //   });
    // });
    //이력서 사진 용량 압축.jpeg
    // return this.fileModel.find();
  }

  async uploadFile(file: Express.Multer.File) {
    const key = Buffer.from(file.originalname, "ascii").toString("utf8");
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ACL: "private",
      Key: key,
      Body: file.buffer,
    };

    return new Promise((resolve, reject) => {
      this.s3.putObject(params, (err, data) => {
        if (err) reject(err);
        console.log(key);
        this.fileModel.create({
          key,
          name: file.originalname,
          size: file.size,
        });
        resolve(key);
      });
    });

    // return {
    //   daa: originalname,
    // };
  }

  async downloadFile(key: string) {
    return this.fileModel.findOne({ key });
  }

  async deleteFile(key: string) {
    return {
      key,
    };
  }

  async updateFile(key: string, newFileName: string) {
    return {
      key,
      newFileName,
    };
  }
}
