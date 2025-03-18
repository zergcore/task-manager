import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { deleteTask } from "../../services/taskService";
import TaskEditModal from "./TaskEditModal";
import { Task } from "../../services/types";
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task }: { task: Task }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteMutation.mutate(task.id);
    }
  };

  return (
    <ListItem>
      <ListItemText
        primary={task.title}
        secondary={task.description}
      />
      <small>{task.status}</small>
      <IconButton onClick={() => handleDelete()}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => setShowEditModal(true)}>
        <FaEdit />
      </IconButton>
      {showEditModal && (
        <TaskEditModal
          task={task}
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
        />
      )}
    </ListItem>
  );
};

export default TaskItem;
