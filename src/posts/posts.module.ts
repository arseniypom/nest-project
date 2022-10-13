import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    FilesModule,
  ],
})
export class PostsModule {}
