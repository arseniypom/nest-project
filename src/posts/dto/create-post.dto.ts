import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Email should be a string' })
  readonly title: string;

  @IsString({ message: 'Password should be a string' })
  readonly content: string;

  readonly userId: string;
}
