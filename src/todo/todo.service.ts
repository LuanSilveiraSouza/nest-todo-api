import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { getRepository, Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(options: {
    onlyDelayed?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<TodoEntity[]> {
    let where = '';

    if (options.onlyDelayed) {
      where = 'todo.due_date < CURRENT_TIMESTAMP';
    }

    return await getRepository(TodoEntity)
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.user', 'user')
      .select(['todo.due_date', 'todo.description', 'user.email'])
      .where(where)
      .limit(options.limit || 1)
      .offset(options.offset || 0)
      .getMany();
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

  async update(updateData: {
    id: number;
    description?: string;
    due_date?: Date;
    completed_at?: Date;
  }): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ id: updateData.id });

    if (!todo) {
      return null;
    }

    if (todo.completed_at == null) {
      todo.description = updateData.description || todo.description;
      todo.due_date = updateData.due_date || todo.due_date;
      todo.completed_at = updateData.completed_at || todo.completed_at;

      await this.todoRepository.save(todo);
    }

    return todo;
  }

  async delete(id: number): Promise<any> {
    return await this.todoRepository.delete({ id });
  }
}
