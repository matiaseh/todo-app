import axios from 'axios';
import { Task } from '../App.type';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllTasks = async (): Promise<Task[]> => {
    const { data } = await axios.get(`${BASE_URL}/tasks`);
    return data;
}