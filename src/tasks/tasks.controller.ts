import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskTextDto } from './dto/task-text-dto';
import { TaskStatusDto } from './dto/task-status-dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.getAllTasks();
  }

  @Post('/createTask')
  create(@Body() taskDto: TaskTextDto) {
    return this.tasksService.createTask(taskDto);
  }

  @Patch('/changeStatusTask')
  changeStatus(@Query('id') id: string, @Body() dto: TaskStatusDto) {
    return this.tasksService.changeStatusTask(id, dto);
  }

  @Patch('/changeAllStatusTasks')
  changeAllStatus(@Body() dto: TaskStatusDto) {
    return this.tasksService.changeAllStatusTasks(dto);
  }

  @Patch('/changeTextTask')
  changeText(@Query('id') id: string, @Body() dto: TaskTextDto) {
    return this.tasksService.changeTextTask(id, dto);
  }

  @Delete('/deleteTask')
  delete(@Query('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Delete('/deleteCompletedTasks')
  deleteCompleted() {
    return this.tasksService.deleteCompletedTasks();
  }
}
