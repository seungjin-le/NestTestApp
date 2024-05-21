import { Module } from "@nestjs/common";
import { FileDeleteController, FileUpdateController, FileUploadController } from "./file-upload.controller";
import { FileService } from "./file-upload.service";
import { MongooseModule } from "@nestjs/mongoose";
import FileUploadSchema from "./file-upload.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "File",
        schema: FileUploadSchema.schema,
      },
    ]),
  ],
  controllers: [FileUploadController, FileDeleteController, FileUpdateController],
  providers: [FileService],
})
export class FileUploadModule {}
