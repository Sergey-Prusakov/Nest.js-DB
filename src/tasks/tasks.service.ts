import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { TaskTextDto } from './dto/task-text-dto';
import { TaskStatusDto } from './dto/task-status-dto';
// import { ChangeTaskDto } from './dto/change-task-dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async getAllTasks() {
    const tasks = await this.taskRepository.findAll();
    return tasks;
  }

  async createTask(dto: TaskTextDto) {
    const task = await this.taskRepository.create(dto);
    return task;
  }

  async changeStatusTask(id: string, dto: TaskStatusDto) {
    const task = await this.taskRepository.findByPk(id);

    console.log(task);

    await this.taskRepository.update(
      {
        isDone: dto.isDone,
      },
      {
        where: {
          id,
        },
      },
    );
    return await this.taskRepository.findByPk(id); // Находим второй раз для получения актуальных данных
  }

  async changeTextTask(id: string, dto: TaskTextDto) {
    await this.taskRepository.update(
      {
        text: dto.text,
        isDone: false,
      },
      {
        where: {
          id,
        },
      },
    );

    return await this.taskRepository.findByPk(id);
  }

  async deleteTask(id: string) {
    return 'InProcess' + id; //////////
  }

  async deleteCompletedTasks() {
    return 'InProcess'; ///////////////
  }
}
