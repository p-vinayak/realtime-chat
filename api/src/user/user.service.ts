import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import PasswordMismatchException from './exceptions/PasswordMismatchException';
import UserAlreadyExistsException from './exceptions/UserAlreadyExistsException';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  private async hashPassword(password) {
    return await hash(password, 10);
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({ username: username });
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.passwordConfirm)
      throw new PasswordMismatchException();
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) throw new UserAlreadyExistsException();
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.password = await this.hashPassword(createUserDto.password);
    return this.userRepository.save(newUser);
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
