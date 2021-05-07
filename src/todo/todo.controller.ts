import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AdminRoleGuard } from 'src/common/admin.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(AdminRoleGuard)
  async findAll(@Query() query): Promise<TodoEntity[]> {
    console.log(query);

    return await this.todoService.findAll(query.delayed);
  }

  @Get('/self')
  async findByUserId(@Req() req: Request): Promise<TodoEntity[]> {
    return await this.todoService.findByUserId(req['user'].id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(
    @Req() req: Request,
    @Body() todoData: CreateTodoDto,
  ): Promise<any> {
    const result = this.todoService.create(
      req['user'].id,
      todoData.description,
      todoData.due_date,
    );

    if (!result) {
      throw new HttpException(
        {
          message: 'User not found',
        },
        HttpStatus.CONFLICT,
      );
    }

    return { message: 'Todo created' };
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async update(
    @Param() params,
    @Body() todoData: UpdateTodoDto,
  ): Promise<TodoEntity> {
    const result = this.todoService.update({
      id: params.id,
      description: todoData.description,
      due_date: todoData.due_date,
    });

    if (!result) {
      throw new HttpException(
        {
          message: 'Todo not found',
        },
        HttpStatus.CONFLICT,
      );
    }

    return result;
  }

  @UsePipes(new ValidationPipe())
  @Put('/:id/complete')
  async complete(@Param() params): Promise<TodoEntity> {
    const result = this.todoService.update({
      id: params.id,
      completed_at: new Date(),
    });

    if (!result) {
      throw new HttpException(
        {
          message: 'Todo not found',
        },
        HttpStatus.CONFLICT,
      );
    }

    return result;
  }

  @Delete('/:id')
  async delete(@Param() params) {
    return await this.todoService.delete(params.id);
  }
}
