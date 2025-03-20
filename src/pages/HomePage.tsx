import { useContext, useEffect, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import { AuthContext } from "../context/AuthContext";
import { Container, Snackbar, Alert, Paper, Grid } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../types/error";
import { getAllTasks } from "../services/taskService";
import { Task } from "../services/types";
import TaskBoard from "../components/tasks/TaskBoard";
import TaskChart from "../components/tasks/TaskChart";

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

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData);
    }
  }
    , [tasksData]);

  const handleDelete = () => {
    setSnackbarOpen(true);
  };

  return (
    <Container sx={{ marginTop: 4 }}>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <TaskBoard tasks={tasks} setTasks={setTasks} onDelete={handleDelete} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
            {isAuthenticated ? (
                <TaskForm />
              ) : (
                <div className="text-center py-3">
                  <p>Log in to create a task</p>
                </div>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <TaskChart />
            </Paper>
          </Grid>
        </Grid>

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
