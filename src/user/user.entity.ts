import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from './user.interface';

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
    this.password = await bcrypt.hash(this.password, process.env.SALT_ROUNDS);
  }
}
