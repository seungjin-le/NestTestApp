import { ApiProperty } from "@nestjs/swagger";

export class Member {
  @ApiProperty({ type: Number })
  id?: number;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: Number })
  age: number;
  @ApiProperty({ type: String })
  gender: string;
}
