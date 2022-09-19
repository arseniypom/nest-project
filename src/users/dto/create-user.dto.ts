import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'abc@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty12345', description: 'Password' })
  readonly password: string;
}
