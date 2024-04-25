import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TaskDto } from './dto/task-dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  create(@Body() taskDto: TaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @Patch('/:id')
  change(@Param('id') id: string, @Body() dto: TaskDto) {
    return this.tasksService.changeTask(id, dto);
  }

  @Patch()
  changeAllStatus(@Body() dto: TaskDto) {
    return this.tasksService.changeAllStatusTasks(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Delete()
  deleteCompleted() {
    return this.tasksService.deleteCompletedTasks();
  }
}
