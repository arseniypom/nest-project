import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
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
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users (ADMIN-ONLY)' })
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

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  async fetchById(@Res() response, @Param('id') id) {
    const user = await this.userService.readById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return response.status(HttpStatus.OK).json({
      user,
    });
  }

  @ApiOperation({ summary: 'New user creation' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  async createUser(@Res() response, @Body() user: CreateUserDto) {
    const newUser = await this.userService.create(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @ApiOperation({ summary: 'Update user data by id' })
  @ApiResponse({ status: 200, type: User })
  @Put('/:id')
  async updateUser(@Res() response, @Param('id') id, @Body() user: User) {
    const newUser = await this.userService.update(id, user);
    return response.status(HttpStatus.OK).json({
      newUser,
    });
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, type: User })
  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') id) {
    const deletedUser = await this.userService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedUser,
    });
  }

  @ApiOperation({ summary: 'Assign role to user (ADMIN-ONLY)' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  async addRole(@Body() dto: AddRoleDto, @Res() response) {
    const user = await this.userService.addRole(dto);
    return response.status(HttpStatus.OK).json({
      user,
    });
  }

  @ApiOperation({ summary: 'Ban user (ADMIN-ONLY)' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  async ban(@Body() dto: BanUserDto, @Res() response) {
    const user = await this.userService.ban(dto);
    return response.status(HttpStatus.OK).json({
      user,
    });
  }
}
