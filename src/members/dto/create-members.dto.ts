import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMembersDto {
  @IsString()
  @ApiProperty({ type: String, description: "이름" })
  readonly name: string;
  @IsNumber()
  @ApiProperty({ type: Number, description: "나이" })
  readonly age: number;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ type: [String], description: "성별" })
  readonly gender: string;
}
