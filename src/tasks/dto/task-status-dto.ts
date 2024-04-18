import { IsBoolean } from 'class-validator';

export class TaskStatusDto {
  @IsBoolean()
  readonly isDone: boolean;
}
