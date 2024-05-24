import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFileDto {
  @IsString()
  @ApiProperty({ type: File, description: "파일" })
  readonly file: File;
}
