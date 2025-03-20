import { Grid } from '@mui/material';
import SortableTaskCard from './SortableTaskCard';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '../../services/types';

interface TaskBoardProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  onDelete: (id: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, setTasks, onDelete }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <Grid container spacing={2}>
          {tasks.map(task => (
            <Grid item key={task.id} xs={12} sm={6} md={4}>
              <SortableTaskCard task={task} onDelete={onDelete} />
            </Grid>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};

export default TaskBoard;
