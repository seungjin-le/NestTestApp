import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMembersDto {
  @IsNumber()
  @ApiProperty({ type: Number })
  readonly id: string;

  @IsString()
  @ApiProperty({ type: String })
  readonly email: number;

  @IsString()
  @ApiProperty({ type: String })
  readonly password: string;
}
