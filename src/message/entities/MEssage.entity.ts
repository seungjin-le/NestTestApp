import { ApiProperty } from "@nestjs/swagger";

export class Movie {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: Number })
  year: number;
  @ApiProperty({ type: [String] })
  genres: string[];
}
