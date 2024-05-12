import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteFileDto {
  @IsString()
  @ApiProperty({ type: String, description: "S3 파일 키", example: "example-key-123" })
  readonly key: string;
}
