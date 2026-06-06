import { useDroppable } from '@dnd-kit/core'
import { Box, Typography, Button } from '@mui/material'

import TaskCard from './TaskCard'

import '../SprintBoard.scss'

interface Task {
  id: string
  number: string
  assignee: string
  status: string
}

interface TaskColumnProps {
  id: string
  title: string
  tasks: Task[]
  hasButton: boolean
  buttonText?: string
  onButtonClick?: () => void
}

const TaskColumn = ({ id, title, tasks, hasButton, buttonText, onButtonClick }: TaskColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id })

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

      <Box ref={setNodeRef} className={`tasks-container${isOver ? ' is-over' : ''}`}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
    </Box>
  )
}

export default TaskColumn
