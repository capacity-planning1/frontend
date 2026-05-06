import { Paper, Typography } from '@mui/material'

interface Task {
  id: number
  number: string
  assignee: string
  status: string
}

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Paper
      className='task-card'
      elevation={0}
    >
      <Typography className='task-number'>{task.number}</Typography>
      <Typography className='task-assignee'>{task.assignee}</Typography>
    </Paper>
  )
}

export default TaskCard
