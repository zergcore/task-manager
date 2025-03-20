import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../services/taskService";
import { Task } from "../../services/types";
import { AxiosError } from "axios";
import { Dialog, DialogTitle, DialogContent, Alert, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { ErrorResponse } from "../../types/error";

const TaskEditModal = ({
  task,
  show,
  onHide,
}: {
  task: Task;
  show: boolean;
  onHide: () => void;
}) => {
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (updatedTask: Task) =>
      updateTask(task.id, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onHide();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setError(error.response?.data?.message || "Failed to update task");
    },
  });

  const handleSubmit = (status: string) => {
    if (status === task.status) return;
    updateMutation.mutate({ ...task, status });
  };

  return (
    <Dialog open={show} onClose={onHide} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task Status</DialogTitle>
      <DialogContent dividers>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={task.status}
            label="Status"
            onChange={(e) => handleSubmit(e.target.value)}
          >
            <MenuItem value="to do">To Do</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default TaskEditModal;
