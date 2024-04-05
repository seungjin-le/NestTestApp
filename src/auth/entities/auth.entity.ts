import { ApiProperty } from "@nestjs/swagger";

export class Auth {
  @ApiProperty({ type: Number })
  id?: number;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}
