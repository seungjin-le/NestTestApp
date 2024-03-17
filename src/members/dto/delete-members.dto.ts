import { ApiProperty } from "@nestjs/swagger";

export class DeleteMembersDto {
  @ApiProperty({ description: "" })
  status: number;

  @ApiProperty({ description: "" })
  res: boolean;
}
