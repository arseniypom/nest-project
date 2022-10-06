import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: CreateUserDto) {
    const candidate = await this.validateUser(user);
    return this.generateToken(candidate);
  }

  private async validateUser(user: CreateUserDto) {
    const candidate = await this.userService.readByEmail(user.email);
    const isPasswordEqual = await bcrypt.compare(
      user.password,
      candidate.password,
    );
    if (candidate && isPasswordEqual) {
      return candidate;
    } else {
      throw new UnauthorizedException({ message: 'Invalid email or password' });
    }
  }

  async registration(user: CreateUserDto) {
    const candidate = await this.userService.readByEmail(user.email);

    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(user.password, 5);
    const newUser = await this.userService.create({
      ...user,
      password: hashPassword,
    });

    return this.generateToken(newUser);
  }

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user._id,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
