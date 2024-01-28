import { ApiProperty } from "@nestjs/swagger";

export class DeleteMovieDto {
  @ApiProperty({ description: "The response status" })
  status: number;

  @ApiProperty({ description: "The response result" })
  res: boolean;
}
