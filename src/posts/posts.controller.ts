import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Res() response,
    @Body() post: CreatePostDto,
    @UploadedFile() image,
  ) {
    const newPost = await this.postsService.create(post, image);
    return response.status(HttpStatus.CREATED).json(newPost);
  }
}
