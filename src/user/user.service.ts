import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ email });
  }

  async create(user: User): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.role = user.role;
    newUser.password = user.password;

    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  async delete(name: string): Promise<void> {
    await this.userRepository.delete({ name });
    return;
  }

  async generateToken(id: number, email: string): Promise<any> {
    const date = new Date();

    return jwt.sign(
      {
        id: id,
        email: email,
        exp: date.getTime() + 1000 * 60 * 60 * 24 * 3,
      },
      process.env.JWT_SECRET,
    );
  }
}
