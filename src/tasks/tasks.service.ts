import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './tasks.model';
import { TaskDto } from './dto/task-dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async getAllTasks() {
    const tasks = await this.taskRepository.findAll({
      order: [['createdAt', 'ASC']],
    });
    return tasks;
  }

  async createTask(dto: TaskDto) {
    return await this.taskRepository.create(dto);
  }

  async changeTask(id: string, dto: TaskDto) {
    return await this.taskRepository.update(
      {
        text: dto.text,
        isDone: dto.isDone,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async changeAllStatusTasks(dto: TaskDto) {
    return await this.taskRepository.update(
      {
        isDone: dto.isDone,
      },
      {
        where: {
          isDone: !dto.isDone,
        },
      },
    );
  }

  async deleteTask(id: string) {
    return await this.taskRepository.destroy({
      where: {
        id,
      },
    });
  }

  async deleteCompletedTasks() {
    return await this.taskRepository.destroy({
      where: {
        isDone: true,
      },
    });
  }
}
