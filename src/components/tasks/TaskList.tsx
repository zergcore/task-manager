import { Alert } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "../../services/taskService";
import TaskItem from "./TaskItem";
import { AxiosError } from "axios";
import { Task } from "../../services/types";
import { CircularProgress, List } from '@mui/material';
import { ErrorResponse } from "../../types/error";

const TaskList = () => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<Task[], AxiosError<ErrorResponse>>({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error loading tasks: {error.response?.data?.message || error.message}
      </Alert>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <Alert variant="info">No tasks found. Be the first create one!</Alert>;
  }

  return (
    <List>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </List>
  );
};

export default TaskList;
