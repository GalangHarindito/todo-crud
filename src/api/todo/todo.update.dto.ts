import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdatedTodoDto {
  public id: number;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  public createdAt: any;

  public updatedAt: any;
}
