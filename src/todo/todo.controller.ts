import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminRoleGuard } from 'src/common/admin.guard';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(AdminRoleGuard)
  async findAll(): Promise<TodoEntity[]> {
    return await this.todoService.findAll();
  }
}
