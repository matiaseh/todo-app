import axios from 'axios';
import { Task } from '../App.type';

const BASE_URL = import.meta.env.VITE_API_URL;

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
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || 'An unexpected error occurred',
      );
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
