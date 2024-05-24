import { Module } from "@nestjs/common";
import { FileDeleteController, FileUpdateController, FileController, FileDownloadController } from "./file.controller";
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
  controllers: [FileController, FileDeleteController, FileUpdateController, FileDownloadController],
  providers: [FileService],
})
export class FileModule {}
