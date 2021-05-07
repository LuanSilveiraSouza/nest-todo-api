import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 201,
    description: 'Created user',
    type: UserEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
  })
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

  @ApiResponse({
    status: 201,
    description: 'Auth token',
  })
  @ApiResponse({
    status: 401,
    description: `User don't exists`,
  })
  @ApiResponse({
    status: 401,
    description: 'Wrong password',
  })
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
