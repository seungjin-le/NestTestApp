import { Module } from "@nestjs/common";
import {
  FileDeleteController,
  FileUpdateController,
  FileController,
  FileDownloadController,
  GetFileController,
} from "./file.controller";
import { FileService } from "./file.service";
import { MongooseModule } from "@nestjs/mongoose";
import FileSchema from "./file.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "File",
        schema: FileSchema.schema,
      },
    ]),
  ],
  controllers: [GetFileController, FileController, FileDeleteController, FileUpdateController, FileDownloadController],
  providers: [FileService],
})
export class FileModule {}
