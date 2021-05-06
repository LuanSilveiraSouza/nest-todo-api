import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find({ relations: ['user'] });
  }

  async findByUserId(id: number): Promise<TodoEntity[]> {
    const user = await this.userService.findById(id);

    return user.todos;
  }

  async create(
    user_id: number,
    description: string,
    due_date: Date,
  ): Promise<TodoEntity> {
    const user = await this.userService.findById(user_id);

    if (!user) {
      return null;
    }

    const newTodo = new TodoEntity();
    newTodo.description = description;
    newTodo.due_date = due_date;
    newTodo.user = user;

    const savedTodo = await this.todoRepository.save(newTodo);
    return savedTodo;
  }

  async delete(id: number): Promise<any> {
    return await this.todoRepository.delete({ id });
  }
}
