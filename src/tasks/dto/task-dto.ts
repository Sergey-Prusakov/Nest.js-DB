import { IsBoolean, IsString } from 'class-validator';

export class TaskDto {
  @IsBoolean()
  readonly isDone?: boolean;

  @IsString()
  readonly text?: string;
}
