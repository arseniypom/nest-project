import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private rolesService: RolesService,
  ) {}

  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async readById(id): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async readByEmail(email): Promise<User> {
    return await this.userModel.findOne({ email }).populate('roles').exec();
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    const role = await this.rolesService.getRoleByValue('USER');
    newUser.roles = [role._id];
    return newUser.save();
  }

  async update(id, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async addRole(dto: AddRoleDto): Promise<User> {
    const user = await this.userModel.findById(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);
    if (user && role) {
      user.roles = [...user.roles, role];
      return user.save();
    }
    throw new HttpException(
      'The user or the role was not found',
      HttpStatus.NOT_FOUND,
    );
  }

  async ban(dto: BanUserDto): Promise<User> {
    const user = await this.userModel.findById(dto.userId);
    if (user) {
      user.isBanned = true;
      user.banReason = dto.banReason;
      return user.save();
    }
    throw new HttpException('The user was not found', HttpStatus.NOT_FOUND);
  }
}
