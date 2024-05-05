import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateFileDto {
  @IsString()
  @ApiProperty({ type: String, description: "파일 이름" })
  readonly name: string;

  @IsString()
  @ApiProperty({ type: String, description: "파일 경로" })
  readonly path: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: "파일 크기" })
  readonly size: number;
}
