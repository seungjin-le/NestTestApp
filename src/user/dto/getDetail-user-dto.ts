import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetDetailUserDto {
  @ApiProperty({ description: "유저 이메일" })
  @IsString()
  email: string;
  @ApiProperty({ description: "패스워드" })
  @IsString()
  password: string;
  @ApiProperty({ description: "닉네임" })
  @IsString()
  nickname: string;
}
