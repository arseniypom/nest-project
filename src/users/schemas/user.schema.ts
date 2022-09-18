import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isBanned: boolean;

  @Prop()
  banReason: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
