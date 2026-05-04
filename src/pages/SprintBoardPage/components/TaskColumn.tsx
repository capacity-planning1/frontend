import { Box, Typography, Button } from '@mui/material'

import TaskCard from './TaskCard'

import '../SprintBoard.scss'

interface Task {
  id: number
  number: string
  assignee: string
  status: string
}

interface TaskColumnProps {
  title: string
  tasks: Task[]
  hasButton: boolean
  buttonText?: string
  onButtonClick?: () => void
}

const TaskColumn = ({ title, tasks, hasButton, buttonText, onButtonClick }: TaskColumnProps) => {
  return (
    <Box className='task-column'>
      <Box className='button-area'>
        {hasButton ? (
          <Button className='column-button' onClick={onButtonClick}>
            {buttonText}
          </Button>
        ) : (
          <Box className='button-placeholder' />
        )}
      </Box>

      <Typography className='column-title'>{title}</Typography>

      <Box className='tasks-container'>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
    </Box>
  )
}

export default TaskColumn
