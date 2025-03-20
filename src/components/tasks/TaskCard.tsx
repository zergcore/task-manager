import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../../services/types';
import { useDeleteTaskMutation } from '../../hooks/useTasks';
import { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import TaskEditModal from "./TaskEditModal";
import { AuthContext } from '../../context/AuthContext';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const context = useContext(AuthContext);
  const isAuthenticated = context?.isAuthenticated;

  const deleteTaskMutation = useDeleteTaskMutation();

  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="body2">
          {task.description}
        </Typography>
        <Typography variant="body2">
          {task.status}
        </Typography>
      </CardContent>
      {isAuthenticated ? (
        <>
          <IconButton
            aria-label="delete"
            onClick={() => {
              deleteTaskMutation.mutate(task.id);
              onDelete(task.id);
            }}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            sx={{ position: 'absolute', top: 8, right: 40 }}
            onClick={() => setShowEditModal(true)}
          >
            <FaEdit />
          </IconButton>
        </>
      ) : (
        <></>
      )}
      {showEditModal && (
        <TaskEditModal
          task={task}
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
        />
      )}
    </Card>
  );
};

export default TaskCard;
