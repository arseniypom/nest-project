import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetchAll(@Res() response) {
    const users = await this.userService.readAll();
    return response.status(HttpStatus.OK).json({
      users,
    });
  }

  @Get('/:id')
  async fetchById(@Res() response, @Param('id') id) {
    const user = await this.userService.readById(id);
    return response.status(HttpStatus.OK).json({
      user,
    });
  }

  @Post()
  async createUser(@Res() response, @Body() user: User) {
    const newUser = await this.userService.create(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Put('/:id')
  async updateUser(@Res() response, @Param('id') id, @Body() user: User) {
    const newUser = await this.userService.update(id, user);
    return response.status(HttpStatus.OK).json({
      newUser,
    });
  }

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') id) {
    const deletedUser = await this.userService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedUser,
    });
  }
}
