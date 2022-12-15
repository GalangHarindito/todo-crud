import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateTodoDto } from './todo.dto';
import { UpdatedTodoDto } from './todo.update.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  @Inject(TodoService)
  private readonly service: TodoService;

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.service.getTodoId(id);
  }

  @Get()
  public getTodo(): Promise<Todo[]> {
    return this.service.getTodo();
  }

  @Post()
  public createTodo(@Body() body: CreateTodoDto): Promise<Todo> {
    return this.service.createTodo(body);
  }

  @Put(':id')
  public updateTodo(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() todo: UpdatedTodoDto,
  ): Promise<Todo | undefined> {
    return this.service.updateTodo(id, todo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.service.deleteTodo(id);
  }
}
