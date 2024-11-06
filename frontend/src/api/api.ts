import axios from 'axios';
import { Task, TaskStatus } from '../App.type';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${BASE_URL}/tasks`);
  return response.data;
};

export const addNewTask = async (newTaskName: string): Promise<Task> => {
  const response = await axios.post<Task>(`${BASE_URL}/tasks`, {
    name: newTaskName,
  });
  return response.data;
};

export const updateTaskStatus = async (
  taskId: number,
  status: TaskStatus,
): Promise<Task> => {
  const response = await axios.patch<Task>(`${BASE_URL}/tasks/${taskId}`, {
    status,
  });
  return response.data;
};
