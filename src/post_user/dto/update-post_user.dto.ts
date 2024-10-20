import { PartialType } from '@nestjs/swagger';
import { CreatePostUserDto } from './create-post_user.dto';

export class UpdatePostUserDto extends PartialType(CreatePostUserDto) {}
