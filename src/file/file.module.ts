import { Module } from "@nestjs/common";
import { FileDeleteController, FileUpdateController, FileController } from "./file.controller";
import { FileService } from "./file.service";
import { MongooseModule } from "@nestjs/mongoose";
import FileUploadSchema from "./file.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "File",
        schema: FileUploadSchema.schema,
      },
    ]),
  ],
  controllers: [FileController, FileDeleteController, FileUpdateController],
  providers: [FileService],
})
export class FileModule {}
