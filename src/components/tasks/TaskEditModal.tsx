import { useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../services/taskService";
import { Task } from "../../services/types";
import { AxiosError } from "axios";
import { Select, MenuItem } from '@mui/material';
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
    if(status === task.status) return;

    updateMutation.mutate({...task, status});
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Select
        value={task.status}
        onChange={e => handleSubmit(e.target.value as unknown as string)}
      >
        <MenuItem value="to do">To Do</MenuItem>
        <MenuItem value="in progress">In Progress</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
      </Select>
      </Modal.Body>
    </Modal>
  );
};

export default TaskEditModal;
