import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty({ type: String, description: "유저 이메일" })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: "유저 비밀번호" })
  // @MaxLength(20)
  // @MinLength(8, {
  //   message: "패스워드는 최소 8자리 이상이어야 합니다.",
  // })
  // @Matches(/^[a-zA-Z0-9]*$/, {
  //   message: "패스워드는 영문 대소문자와 숫자만 허용됩니다.",
  // })
  password: string;

}
