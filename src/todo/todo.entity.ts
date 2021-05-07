import { UserEntity } from 'src/user/user.entity';
import {
  AfterLoad,
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

  delayed: boolean;

  @AfterLoad()
  isDelayed() {
    this.delayed = this.due_date.getTime() <= Date.now();
  }

  @BeforeUpdate()
  async updateDate() {
    this.updated_at = new Date();
  }

  @ManyToOne((type) => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
