import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role name' })
  readonly value: string;

  @ApiProperty({ example: '63464cbbeb272d7feaaaecb6', description: 'User id' })
  readonly userId: number;
}
