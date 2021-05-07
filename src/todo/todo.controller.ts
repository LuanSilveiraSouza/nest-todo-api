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
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AdminRoleGuard } from 'src/common/admin.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';

@ApiBearerAuth()
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiQuery({
    name: 'delayed',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Boolean,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Todo list off all users',
    type: TodoEntity,
  })
  @Get()
  @UseGuards(AdminRoleGuard)
  async findAll(@Query() query): Promise<TodoEntity[]> {
    return await this.todoService.findAll({
      onlyDelayed: query.delayed == 'true' ? true : false,
      offset: query.offset || null,
      limit: query.limit || null,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Todo list off the current user',
    type: TodoEntity,
  })
  @Get('/self')
  async findByUserId(@Req() req: Request): Promise<TodoEntity[]> {
    return await this.todoService.findByUserId(req['user'].id);
  }

  @ApiResponse({
    status: 201,
    description: 'Created todo',
  })
  @ApiResponse({
    status: 409,
    description: 'User not found',
  })
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

  @ApiResponse({
    status: 200,
    description: 'Updated todo',
    type: TodoEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'Todo not found',
  })
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

  @ApiResponse({
    status: 200,
    description: 'Updated todo',
    type: TodoEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'Todo not found',
  })
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

  @ApiResponse({
    status: 200,
    description: 'Deleted todo',
  })
  @Delete('/:id')
  async delete(@Param() params) {
    return await this.todoService.delete(params.id);
  }
}
