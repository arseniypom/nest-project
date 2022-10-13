import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private filesServise: FilesService,
  ) {}

  async create(post: CreatePostDto, image: any): Promise<Post> {
    const fileName = await this.filesServise.createFile(image);
    const newPost = new this.postModel({ ...post, image: fileName });
    return newPost.save();
  }
}
