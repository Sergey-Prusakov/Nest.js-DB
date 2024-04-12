import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async getAllTasks() {
    const tasks = await this.taskRepository.findAll();
    return tasks;
  }

  async createTask(dto: CreateTaskDto) {
    const task = await this.taskRepository.create(dto);
    return task;
  }

  async changeStatusTask(id: any) {
    const task = await this.taskRepository.findByPk(id);

    console.log(task);

    await this.taskRepository.update(
      { isDone: !task.isDone },
      {
        where: {
          id,
        },
      },
    );
    return await this.taskRepository.findByPk(id); // Находим второй раз для получения актуальных данных
  }

  async upgradeTask(id: string, dto: CreateTaskDto) {
    const task = await this.taskRepository.findByPk(id);
    task.text = dto.text;
    return task;
  }
}
