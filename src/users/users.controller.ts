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
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
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

  @ApiOperation({ summary: 'New user creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async createUser(@Res() response, @Body() user: CreateUserDto) {
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
