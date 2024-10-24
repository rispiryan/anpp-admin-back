import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }
  async getUserByEmail(email: string) {
    const users = await this.userRepository.findOne({
      rejectOnEmpty: undefined,
      where: { email },
      include: { all: true },
    });
    return users;
  }

  async profile(user) {
    return user;
  }
  async changePassword(req, passwordDto: { password: string }) {
    const hashedPassword = await bcrypt.hash(passwordDto.password, 10);
    const user = await this.userRepository.findOne({
      rejectOnEmpty: undefined,
      where: { email: req.email },
      include: { all: true },
    });
    user.password = hashedPassword;
    await user.save();
    return { message: 'Password changed successfully' };
  }
}
