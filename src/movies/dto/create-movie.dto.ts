import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
  @IsString()
  @ApiProperty({ type: String, description: "영화 제목" })
  readonly title: string;
  @IsNumber()
  @ApiProperty({ type: Number, description: "영화 개봉 연도" })
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ type: [String], description: "영화 장르" })
  readonly genres: string[];
}
