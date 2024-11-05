import axios from 'axios';
import { Task, TaskStatus } from '../App.type';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const BASE_URL = import.meta.env.VITE_API_URL;

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    toastr.error(error.response.data.message || 'An unexpected error occurred');
    return new Error(
      error.response.data.message || 'An unexpected error occurred',
    );
  } else {
    toastr.error('An unexpected error occurred');
    return new Error('An unexpected error occurred');
  }
};

export const getAllTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get(`${BASE_URL}/tasks`);
  return data;
};

export const addNewTask = async (newTaskName: string): Promise<Task> => {
  try {
    const response = await axios.post<Task>(`${BASE_URL}/tasks`, {
      name: newTaskName,
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const updateTaskStatus = async (
  taskId: number,
  status: TaskStatus,
): Promise<Task> => {
  try {
    const response = await axios.patch<Task>(`${BASE_URL}/tasks/${taskId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
