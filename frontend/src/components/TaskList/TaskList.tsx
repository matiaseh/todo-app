import { Task, TaskStatus } from '../../App.type';
import Button from '../Button/Button';
import styles from './TaskList.module.scss';

interface TaskListProps {
  tasks: Task[];
  status: TaskStatus;
  onClick: (taskId: number) => void;
}

const TaskList = ({ tasks, status, onClick }: TaskListProps) => {
  return (
    <>
      {tasks.filter((task) => task.status === status).length === 0 ? (
        <p>{`No tasks ${status}`}</p>
      ) : (
        <table className={styles.taskItems}>
          <tbody>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>
                    <Button onClick={() => onClick(task.id)}>
                      Mark as undone
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TaskList;
