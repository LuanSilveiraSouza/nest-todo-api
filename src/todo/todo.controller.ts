import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AdminRoleGuard } from 'src/common/admin.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
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

  @Get('/self')
  async findByUserId(@Req() req: Request): Promise<TodoEntity[]> {
    return await this.todoService.findByUserId(req['user'].id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Req() req: Request, @Body() todoData: CreateTodoDto) {
    const result = this.todoService.create(
      req['user'].id,
      todoData.description,
      todoData.due_date,
    );

    if (result) {
      throw new HttpException(
        {
          message: 'User not found',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Delete('/:id')
  async delete(@Param() params) {
    return await this.todoService.delete(params.id);
  }
}
