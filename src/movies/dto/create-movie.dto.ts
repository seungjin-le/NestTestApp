import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
  @IsString()
  @ApiProperty({ type: String })
  readonly title: string;
  @IsNumber()
  @ApiProperty({ type: Number })
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  readonly genres: string[];
}
