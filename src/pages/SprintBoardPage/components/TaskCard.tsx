import { useDraggable } from '@dnd-kit/core'
import { Paper, Typography } from '@mui/material'

interface Task {
  id: string
  number: string
  assignee: string
  status: string
}

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  }

  return (
    <Paper ref={setNodeRef} style={style} className='task-card' elevation={0} {...listeners} {...attributes}>
      <Typography className='task-number'>{task.number}</Typography>
      <Typography className='task-assignee'>{task.assignee}</Typography>
    </Paper>
  )
}

export default TaskCard
