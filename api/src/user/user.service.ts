import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import InvalidUsernameOrPasswordException from './exceptions/InvalidUsernameOrPasswordException';
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

  private findByUsername(username: string) {
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

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findByUsername(loginUserDto.username);
    if (!user) throw new InvalidUsernameOrPasswordException();
    if (!(await compare(loginUserDto.password, user.password)))
      throw new InvalidUsernameOrPasswordException();
    return user;
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
