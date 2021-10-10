import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    const { id, username } = await this.userService.create(createUserDto);
    req.session.user = { id, username };
    return req.session.user;
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
    const { id, username } = await this.userService.login(loginUserDto);
    req.session.user = { id, username };
    return req.session.user;
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
