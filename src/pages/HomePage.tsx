import { useContext, useEffect, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { AuthContext } from "../context/AuthContext";
import { Container, Typography, Snackbar, Alert, Button, Box } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../types/error";
import { getAllTasks } from "../services/taskService";
import { Task } from "../services/types";
import TaskBoard from "../components/tasks/TaskBoard";
import { useCreateTaskMutation } from "../hooks/useTasks";

const HomePage = () => {
  const context = useContext(AuthContext);
  const isAuthenticated = context?.isAuthenticated;
  const {
    data: tasksData,
  } = useQuery<Task[], AxiosError<ErrorResponse>>({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const createTaskMutation = useCreateTaskMutation();

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData);
    }
  }
    , [tasksData]);

  const handleDelete = () => {
    setSnackbarOpen(true);
  };

  const handleCreateTask = (newTask: Omit<Task, "id">) => {
    if (!newTask.title || !newTask.description) return;

    createTaskMutation.mutate(
      newTask,
    );
  };

  return (
    <Container sx={{ marginTop: 4 }}>

      {isAuthenticated ? (
        <TaskForm />
      ) : (
        <div className="text-center py-3">
          <p>Log in to create a task</p>
        </div>
      )}

      <TaskBoard tasks={tasks} setTasks={setTasks} onDelete={handleDelete} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          Task deleted!
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default HomePage;
