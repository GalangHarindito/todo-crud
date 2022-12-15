import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  @InjectRepository(Todo)
  private readonly repository: Repository<Todo>;

  async getTodoId(id: number): Promise<Todo> {
    try {
      const itemFromDB = await this.repository.findOne({
        where: {
          id: id,
        },
      });
      if (!itemFromDB) {
        throw new NotFoundException('Id not found');
      }
      return itemFromDB;
    } catch (er) {
      throw new HttpException(`${er}`, HttpStatus.BAD_REQUEST, {
        cause: new Error('Cause Error'),
      });
    }
  }

  public getTodo(): Promise<Todo[]> {
    try {
      return this.repository.find();
    } catch (er) {
      throw new Error(`message: ${er.message}`);
    }
  }

  public createTodo(body: CreateTodoDto): Promise<Todo> {
    const todo: Todo = new Todo();

    todo.title = body.title;
    todo.description = body.description;
    try {
      return this.repository.save(todo);
    } catch (er) {
      throw new Error(`Update error: ${er.message}.`);
    }
  }

  async updateTodo(id: number, todo: Todo): Promise<Todo> {
    try {
      const itemFromDB = await this.repository.findOne({
        where: {
          id: id,
        },
      });
      if (!itemFromDB) {
        throw new NotFoundException('Id not found');
      }
      return this.repository.save({ ...todo, id: Number(id) });
    } catch (er) {
      throw new HttpException(`${er}`, HttpStatus.BAD_REQUEST, {
        cause: new Error('Cause Error'),
      });
    }
  }

  async deleteTodo(id: number): Promise<void> {
    if (!id) throw new Error(`update error: id is empty.`);
    try {
      const itemFromDB = await this.repository.findOne({
        where: {
          id: id,
        },
      });
      if (!itemFromDB) {
        throw new NotFoundException('Id not found');
      }
      await this.repository.remove([itemFromDB]);
    } catch (er) {
      throw new HttpException(`${er}`, HttpStatus.BAD_REQUEST, {
        cause: new Error('Cause Error'),
      });
    }
  }
}
