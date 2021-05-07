import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  due_date: Date;

  @ApiProperty()
  @Column()
  completed_at: Date;

  @ApiProperty()
  @Column()
  created_at: Date;

  @ApiProperty()
  @Column()
  updated_at: Date;

  @ApiProperty()
  delayed: boolean;

  @AfterLoad()
  isDelayed() {
    this.delayed = this.due_date.getTime() <= Date.now();
  }

  @BeforeUpdate()
  async updateDate() {
    this.updated_at = new Date();
  }

  @ApiProperty()
  @ManyToOne((type) => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
