import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../services/taskService";
import { AxiosError } from "axios";
import { TextField, Button, Alert, Box, Typography } from '@mui/material';
import { ErrorResponse } from "../../types/error";

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setDescription("");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setError(error.response?.data?.message || "Failed to create task");
    },
  });

  const handleSubmit = () => {
    if (!title || !description) return;
    createTaskMutation.mutate({ title, description, status: "to do" });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What should we do next?
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={e => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={e => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={3}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        variant="contained"
        color="primary"
        disabled={createTaskMutation.isPending}
        sx={{ mt: 2 }}
      >
        {createTaskMutation.isPending ? "Creating..." : "Add a Task"}
      </Button>
    </Box>
  );
};

export default TaskForm;
