import { ApiProperty } from "@nestjs/swagger";

export class File {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  path: string;

  @ApiProperty({ type: Number })
  size: number;
}
