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

export class CreateMemberDto {
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}

export class LoginMemberDto {
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}
