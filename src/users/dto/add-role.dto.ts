import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role name' })
  @IsString({ message: 'Value should be a string' })
  readonly value: string;

  @ApiProperty({ example: '63464cbbeb272d7feaaaecb6', description: 'User id' })
  @IsString({ message: 'UserId should be a string' })
  readonly userId: string;
}
