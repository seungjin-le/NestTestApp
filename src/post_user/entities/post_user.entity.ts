import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "post_user" })
export class PostUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 이메일
  @ApiProperty({ type: String })
  @Column()
  email: string;

  // 패스워드
  @ApiProperty({ type: String })
  @Column()
  password: string;

  // 생성일자
  @ApiProperty({ type: String })
  @CreateDateColumn()
  createdAt: Date;

  // 수정일자
  @ApiProperty({ type: String })
  @UpdateDateColumn()
  updatedAt: Date;

  // 삭제일자
  @ApiProperty({ type: Date })
  @DeleteDateColumn()
  deletedAt: Date;
}
