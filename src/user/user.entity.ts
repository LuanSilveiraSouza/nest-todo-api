import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from './user.interface';
import { TodoEntity } from 'src/todo/todo.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.CLIENT,
  })
  role: UserRoles;

  @ApiProperty()
  @Column()
  password: string;

  @BeforeInsert()
  async hashPass() {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.SALT_ROUNDS),
    );
  }

  @ApiProperty()
  @OneToMany((type) => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];
}
