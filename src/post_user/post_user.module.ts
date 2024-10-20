import { Module } from '@nestjs/common';
import { PostUserService } from './post_user.service';
import { PostUserController } from './post_user.controller';

@Module({
  controllers: [PostUserController],
  providers: [PostUserService],
})
export class PostUserModule {}
