import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async readById(id): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(id, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
