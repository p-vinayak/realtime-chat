import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import PasswordMismatchError from './exceptions/PasswordMismatchException';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const { username, password, passwordConfirm } = createUserDto;
    if (password != passwordConfirm) throw new PasswordMismatchError();
    const newUser: User = { username, password };
    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
