import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMembersDto {
  @IsString()
  @ApiProperty({ type: String })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ type: Number })
  readonly age: number;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ type: String })
  readonly gender: string;
}
