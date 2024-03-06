import { ApiProperty } from "@nestjs/swagger";

export class DeleteMovieDto {
  @ApiProperty({ description: "" })
  status: number;

  @ApiProperty({ description: "" })
  res: boolean;
}
