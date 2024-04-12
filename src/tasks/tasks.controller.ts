import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  create(@Body() taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @Patch('/changeStatus')
  changeStatus(@Query('id') id: any) {
    return this.tasksService.changeStatusTask(id);
  }

  @Patch('/upgrade')
  upgrade(@Query() params: any, @Body() dto: CreateTaskDto) {
    return this.tasksService.upgradeTask(params, dto);
  }
}
