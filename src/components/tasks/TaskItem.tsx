import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import TaskEditModal from "./TaskEditModal";
import { Task } from "../../services/types";
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTaskMutation } from "../../hooks/useTasks";

const TaskItem = ({ task }: { task: Task }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const deleteMutation = useDeleteTaskMutation()

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
