import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'abc@gmail.com', description: 'Email' })
  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty12345', description: 'Password' })
  @IsString({ message: 'Password should be a string' })
  @Length(4, 50, {
    message: 'Password should be at least 4 and maximum 50 characters',
  })
  readonly password: string;
}
