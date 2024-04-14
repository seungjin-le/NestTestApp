import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshAuthDto {
  @ApiProperty({ type: String })
  @IsString()
  accessToken: string;

  @ApiProperty({ type: String })
  @IsString()
  refreshToken: string;
}
