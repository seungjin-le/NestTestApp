import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";

export class TokenAuthDtoData {
  @ApiProperty({ type: String, description: "액세스 토큰" })
  @IsString()
  accessToken: string;

  @ApiProperty({ type: String, description: "리프레시 토큰" })
  @IsString()
  refreshToken: string;
}

export class TokenAuthDto {
  @IsObject()
  @ApiProperty({ type: TokenAuthDtoData, description: "데이터" })
  data: object;
}
