import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { TaskTextDto } from './dto/task-text-dto';
import { TaskStatusDto } from './dto/task-status-dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async getAllTasks() {
    const tasks = await this.taskRepository.findAll({
      order: [['createdAt', 'ASC']],
    });
    return tasks;
  }

  async createTask(dto: TaskTextDto) {
    return await this.taskRepository.create(dto);
  }

  async changeStatusTask(id: string, dto: TaskStatusDto) {
    return await this.taskRepository.update(
      {
        isDone: dto.isDone,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async changeAllStatusTasks(dto: TaskStatusDto) {
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

  async changeTextTask(id: string, dto: TaskTextDto) {
    return await this.taskRepository.update(
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
