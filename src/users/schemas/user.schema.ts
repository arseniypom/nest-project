import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'abc@gmail.com', description: 'Email' })
  @Prop({ unique: true, required: true, trim: true })
  email: string;

  @ApiProperty({ example: 'qwerty12345', description: 'Password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'false', description: 'True if the user is banned' })
  @Prop({ default: false })
  isBanned: boolean;

  @ApiProperty({
    example: 'Rules violation',
    description: 'The reason person was banned',
  })
  @Prop()
  banReason: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
