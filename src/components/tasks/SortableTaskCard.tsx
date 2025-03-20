import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../services/types';
import TaskCard from './TaskCard';

interface SortableTaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const SortableTaskCard: React.FC<SortableTaskCardProps> = ({ task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onDelete={onDelete} />
    </div>
  );
};

export default SortableTaskCard;
