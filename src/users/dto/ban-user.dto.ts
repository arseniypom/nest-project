import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({
    example: 'Rule violation',
    description: 'The reason user was banned',
  })
  readonly banReason: string;

  @ApiProperty({ example: '63464cbbeb272d7feaaaecb6', description: 'User id' })
  readonly userId: number;
}
