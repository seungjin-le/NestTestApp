import { ApiProperty } from "@nestjs/swagger";

export class GetAllUserDto {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: Date })
  created_at: Date;
  @ApiProperty({ type: Date })
  updated_at: Date;
  @ApiProperty({ type: Date })
  deleted_at: Date;
}
