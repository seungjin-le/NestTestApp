import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostUserService } from './post_user.service';
import { CreatePostUserDto } from './dto/create-post_user.dto';
import { UpdatePostUserDto } from './dto/update-post_user.dto';

@Controller('post-user')
export class PostUserController {
  constructor(private readonly postUserService: PostUserService) {}

  @Post()
  create(@Body() createPostUserDto: CreatePostUserDto) {
    return this.postUserService.create(createPostUserDto);
  }

  @Get()
  findAll() {
    return this.postUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostUserDto: UpdatePostUserDto) {
    return this.postUserService.update(+id, updatePostUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postUserService.remove(+id);
  }
}
