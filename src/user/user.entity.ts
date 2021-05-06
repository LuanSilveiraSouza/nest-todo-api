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

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.CLIENT,
  })
  role: UserRoles;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPass() {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.SALT_ROUNDS),
    );
  }

  @OneToMany((type) => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];
}
