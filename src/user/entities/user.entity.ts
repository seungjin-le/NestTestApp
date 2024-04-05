import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String })
  @Column()
  email: string;

  @ApiProperty({ type: String })
  @Column()
  password: string;

  @ApiProperty({ type: String })
  @Column()
  nickname: string;

  @ApiProperty({ type: String })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ type: String })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({ type: Date })
  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  private beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
