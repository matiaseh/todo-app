import { useState } from 'react';
import './App.css';
import { TaskStatus } from './App.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewTask, getAllTasks } from './api/api';
import Button from './components/Button/Button';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import InputField from './components/InputField/InputField';

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
      alert(error);
    }
  };

  const markAsDone = (id: number) => {
    // TODO: add implementation
  };

  const markAsUndone = (id: number) => {
    // TODO: add implementation
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
      <table className="taskItems">
        <tbody>
          {sortedTasks
            .filter((task) => task.status === TaskStatus.Todo)
            .map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>
                  <button onClick={() => markAsDone(task.id)}>
                    Mark as done
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h3>Done</h3>
      <table className="taskItems">
        <tbody>
          {sortedTasks
            .filter((task) => task.status === TaskStatus.Done)
            .map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>
                  <button onClick={() => markAsUndone(task.id)}>
                    Mark as undone
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
