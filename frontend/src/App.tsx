import { useState } from 'react';
import './App.css';
import { TaskStatus } from './App.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewTask, getAllTasks, updateTaskStatus } from './api/api';
import { handleErrorMessage } from './utils/errorHandler';
import Button from './components/Button/Button';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import InputField from './components/InputField/InputField';
import TaskList from './components/TaskList/TaskList';

type SortType = 'asc' | 'desc';

function App() {
  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
  });

  const [newTaskName, setNewTaskName] = useState<string>('');
  const [sortingType, setSortingType] = useState<SortType>('desc');

  const queryClient = useQueryClient();

  const toggleSortingType = () => {
    setSortingType((prevType) => (prevType === 'desc' ? 'asc' : 'desc'));
  };

  const addTask = async () => {
    try {
      await addNewTask(newTaskName);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNewTaskName('');
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const markAsDone = async (id: number) => {
    try {
      await updateTaskStatus(id, TaskStatus.Done);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const markAsUndone = async (id: number) => {
    try {
      await updateTaskStatus(id, TaskStatus.Todo);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;
  if (!tasks || tasks.length === 0) {
    return <div>No tasks found</div>;
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return sortingType === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div>
      <h2>ToDo App</h2>
      <div className="addNewTask">
        <InputField
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Add new task"
        />
        <Button onClick={addTask}>Add</Button>
        <Button
          onClick={toggleSortingType}
          iconName={sortingType === 'desc' ? faArrowDown : faArrowUp}
        >
          Sort
        </Button>
      </div>
      <h3>Tasks</h3>
      <TaskList
        tasks={sortedTasks}
        status={TaskStatus.Todo}
        onClick={markAsDone}
      />
      <h3>Done</h3>
      <TaskList
        tasks={sortedTasks}
        status={TaskStatus.Done}
        onClick={markAsUndone}
      />
    </div>
  );
}

export default App;
