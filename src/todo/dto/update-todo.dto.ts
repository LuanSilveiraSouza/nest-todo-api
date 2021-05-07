import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsDateString()
  readonly due_date?: Date;
}
