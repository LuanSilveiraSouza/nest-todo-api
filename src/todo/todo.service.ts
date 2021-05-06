import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async findById(id: number): Promise<TodoEntity> {
    return await this.todoRepository.findOne({ id });
  }

  async create(
    user_id: number,
    description: string,
    due_date: Date,
  ): Promise<TodoEntity> {
    const newTodo = new TodoEntity();
    newTodo.description = description;
    newTodo.due_date = due_date;

    const savedTodo = await this.todoRepository.save(newTodo);
    return savedTodo;
  }
}
