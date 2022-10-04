import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @ApiProperty({ example: '113dagwh14352fs', description: 'Unique role id' })
  // If we use @Prop decorator here, we have to initialize the role's _id manually when creating it
  // @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'ADMIN', description: 'Unique role name' })
  @Prop({ required: true, unique: true })
  value: string;

  @ApiProperty({
    example: 'Administrator',
    description: 'Description for the role',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: [
      {
        email: '123@gmail.com',
        password: '12345',
        isBanned: false,
        roles: ['74652925cbfgcwcg'],
      },
    ],
    description: 'The array of users with this role',
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
