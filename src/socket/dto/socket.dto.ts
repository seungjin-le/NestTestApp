import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from "class-validator";

export class JoinRoomDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  room: string;
}

export class LeaveRoomDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  room: string;
}

export class SocketMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  message: string;

  @IsString()
  @IsOptional()
  room?: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
