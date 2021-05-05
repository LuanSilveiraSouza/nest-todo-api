import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() userData: CreateUserDto) {
    const userExists = await this.userService.findByEmail(userData.email);

    if (userExists) {
      throw new HttpException(
        {
          message: 'User already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    return this.userService.create({ ...userData });
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login(@Body() userData: LoginDto) {
    const user = await this.userService.findByEmail(userData.email);

    if (!user) {
      throw new HttpException(
        {
          message: `User don't exists`,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (await !bcrypt.compare(userData.password, user.password)) {
      throw new HttpException(
        {
          message: `Wrong password`,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.userService.generateToken(user.id, user.email);

    return { token };
  }
}
