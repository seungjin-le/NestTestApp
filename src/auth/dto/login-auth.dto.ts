import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginAuthDto {
  @ApiProperty({ type: String, description: "이메일" })
  @IsString()
  email: string;
  @ApiProperty({ type: String, description: "패스워드" })
  @IsString()
  password: string;
}
