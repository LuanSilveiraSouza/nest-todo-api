import { UserEntity } from 'src/user/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  due_date: Date;

  @Column()
  completed_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @BeforeUpdate()
  async updateDate() {
    this.updated_at = new Date();
  }

  @ManyToOne((type) => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
