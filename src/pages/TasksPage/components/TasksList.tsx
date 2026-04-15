import { Box } from '@mui/material'

import TaskCard from './TaskCard'
import '../MyTasks.scss'

interface Task {
  id: number
  title: string
  description: string
  remainingTime: string
  plannedTime: string
}

interface TasksListProps {
  tasks: Task[]
}

const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <Box className='tasks-list'>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Box>
  )
}

export default TasksList
