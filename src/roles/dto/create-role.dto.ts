import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Unique role name' })
  readonly value: string;

  @ApiProperty({
    example: 'Administrator',
    description: 'Description for the role',
  })
  readonly description: string;
}
