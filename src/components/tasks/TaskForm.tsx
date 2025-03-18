import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../services/taskService";
import { AxiosError } from "axios";
import { TextField, Button } from '@mui/material';
import { ErrorResponse } from "../../types/error";

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // Invalidate and refetch the tasks list query
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("")
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
    <div>
      <h5>What should we do next?</h5>
      {error && <Alert variant="danger">{error}</Alert>}

      <TextField label="Title" fullWidth value={title} onChange={e => setTitle(e.target.value)} />
      <TextField label="Description" fullWidth value={description} onChange={e => setDescription(e.target.value)} />
      <Button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        variant="contained"
        color="primary"
        disabled={createTaskMutation.isPending}
        component="button"
      >
        {createTaskMutation.isPending ? "Creating..." : "Add a Task"}
      </Button>
    </div>
  );
};

export default TaskForm;
