import { IsString } from 'class-validator';

export class TaskTextDto {
  @IsString()
  readonly text: string;
}
