import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AddTaskDto, Task, TaskStatus, UpdateTaskDto } from './task.type';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TaskController', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
  });

  describe('GET Tasks', () => {
    it('should return default tasks', () => {
      const defaultTasks: Task[] = [
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
      expect(taskController.getTasks()).toEqual(defaultTasks);
    });

    it('should have correct length', () => {
      const tasks = taskController.getTasks();
      expect(tasks).toHaveLength(3);
      expect(tasks[0].name).toBe('Vacuum the living room');
    });
  });

  describe('POST Task', () => {
    it('should add a new task', () => {
      const newTask: AddTaskDto = { name: 'Change winter tyres' };
      const task = taskController.addTask(newTask);

      expect(task).toBeDefined();
      expect(task.id).toBe(4);
      expect(task.name).toBe(newTask.name);
      expect(task.status).toBe(TaskStatus.Todo);
    });

    it('should throw error if name is invalid', () => {
      const newTask: AddTaskDto = { name: '' };

      expect(() => {
        taskController.addTask(newTask);
      }).toThrow(BadRequestException);
      expect(() => {
        taskController.addTask({ name: null as any });
      }).toThrow(BadRequestException);
    });
  });

  describe('PATCH Task', () => {
    it('should update the task status', () => {
      const updateData: UpdateTaskDto = { status: TaskStatus.Done };
      const taskToUpdate = taskController.getTasks().find((t) => t.id === 1);

      expect(taskToUpdate.status).toBe(TaskStatus.Todo);
      taskController.updateTask(taskToUpdate.id, updateData);
      expect(taskToUpdate.status).toBe(TaskStatus.Done);
    });

    it('should throw error if task not found', () => {
      const updateData: UpdateTaskDto = { status: TaskStatus.Done };

      expect(() => {
        taskController.updateTask(999, updateData);
      }).toThrow(NotFoundException);
    });
  });
});
