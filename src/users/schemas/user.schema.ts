import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Role } from 'src/roles/schemas/roles.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: '113dagwh14352fs', description: 'Unique user id' })
  // If we use @Prop decorator here, we have to initialize the user's _id manually when creating it
  // @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

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

  @ApiProperty({
    example: [
      {
        value: 'ADMIN',
        description: 'Administrator',
        users: ['74652925cbfgcwcg'],
      },
    ],
    description: 'The array of roles for this user',
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
