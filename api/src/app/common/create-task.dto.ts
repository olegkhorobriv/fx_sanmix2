import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDate()
  dueDate: Date;
}
