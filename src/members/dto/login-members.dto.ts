import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginMembersDto {
  @IsString()
  @ApiProperty({ type: String, description: "이메일" })
  readonly email: string;
  @IsString()
  @ApiProperty({ type: Number, description: "패스워드" })
  readonly password: string;
}
