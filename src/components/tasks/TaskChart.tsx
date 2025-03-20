import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Alert, CircularProgress, Container, Typography } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from '../../services/taskService';
import { Task } from '../../services/types';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/error';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const TaskChart: React.FC = () => {
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
      <Alert>
        Error loading tasks: {error.response?.data?.message || error.message}
      </Alert>
    );
  }
  if (!tasks || tasks.length === 0) {
    return <Alert>No tasks found. Be the first create one!</Alert>;
  }

  const data = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'to do').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in progress').length },
    { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length },
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Task Overview
      </Typography>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Container>
  );
};

export default TaskChart;
