import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "auth" })
export class AuthEntity {
  @Column()
  @ApiProperty({ type: String })
  accessToken: string;

  @PrimaryGeneratedColumn()
  @ApiProperty({ type: String })
  refreshToken: string;
}
