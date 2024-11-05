import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto, Task, UpdateTaskDto } from './task.type';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(): Task[] {
    return this.taskService.getTasks();
  }

  @Post()
  addTask(@Body() requestBody: AddTaskDto): Task {
    return this.taskService.addTask(requestBody);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: number,
    @Body() requestBody: UpdateTaskDto,
  ): void {
    return this.taskService.updateTask(id, requestBody);
  }
}
