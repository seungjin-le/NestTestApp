import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMovieDto {
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
