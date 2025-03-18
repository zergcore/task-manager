import { useContext } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { AuthContext } from "../context/AuthContext";
import { Container, Typography } from '@mui/material';

const HomePage = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const context = useContext(AuthContext);
  const isAuthenticated = context?.isAuthenticated;

  return (
    <Container className="py-4">
      <Typography variant="h4" gutterBottom>
        {api_url} Task Management
      </Typography>
      {isAuthenticated ? (
        <TaskForm />
      ) : (
        <div className="text-center py-3">
          <p>Log in to create a task</p>
        </div>
      )}
      <TaskList />
    </Container>
  );
};

export default HomePage;
