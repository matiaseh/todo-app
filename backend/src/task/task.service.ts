import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddTaskDto, Task, TaskStatus, UpdateTaskDto } from './task.type';

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Vacuum the living room',
      status: TaskStatus.Todo,
      createdAt: '2024-10-30T12:00:00.000Z',
      listId: 1,
    },
    {
      id: 2,
      name: 'Dust the kitchen',
      status: TaskStatus.Todo,
      createdAt: '2024-10-30T10:00:00.000Z',
      listId: 1,
    },
    {
      id: 3,
      name: 'Take out the trash',
      status: TaskStatus.Done,
      createdAt: '2024-10-30T08:00:00.000Z',
      listId: 1,
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: AddTaskDto): Task {
    if (
      !task.name ||
      typeof task.name !== 'string' ||
      task.name.trim() === ''
    ) {
      throw new BadRequestException(
        'Task name must be a valid non-empty string.',
      );
    }

    const newTask: Task = {
      id: this.tasks.length + 1,
      name: task.name,
      status: TaskStatus.Todo,
      createdAt: new Date().toISOString(),
      listId: 1, // Put all new tasks into listId 1 for now.
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, task: UpdateTaskDto): void {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (!taskToUpdate) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    taskToUpdate.status = task.status;
  }
}
