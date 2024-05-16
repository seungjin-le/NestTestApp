import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

// UpdateFileDto는 이미지 파일을 업데이트할 때 사용할 DTO입니다.
export class UpdateFileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "S3 이미지 파일 키", example: "image-key-123" })
  readonly key: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "새 이미지 파일 이름", example: "updated-image-name.jpg" })
  readonly newFileName: string;
}
