import { useState } from 'react'
import { Box, Paper, Button, Typography } from '@mui/material'
import projectLogo from '../../../assets/images/project-logo.jpg'
import ReassignmentModal from './ReassignmentModal'
import '../MyTasks.scss'

interface Task {
  id: number
  title: string
  description: string
  remainingTime: string
  plannedTime: string
}

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmitReassignment = (reason: string) => {
    console.log(`Запрос переназначения для задачи "${task.title}": ${reason}`)
  }

  return (
    <>
      <Paper className='task-card' elevation={0}>
        <Box className='task-avatar'>
          <Box component='img' src={projectLogo} alt='Project logo' className='project-logo' />
        </Box>

        <Box className='task-info'>
          <Typography className='task-title'>{task.title}</Typography>
          <Typography className='task-description'>{task.description}</Typography>
          <Typography className='task-time'>Кол-во оставшегося времени / кол-во запланированного времени</Typography>
          <Typography className='task-time-values'>
            {task.remainingTime} / {task.plannedTime}
          </Typography>
        </Box>

        <Box className='task-actions'>
          <Button variant='outlined' size='small' className='action-btn'>
            принять задачу
          </Button>
          <Button variant='outlined' size='small' className='action-btn' onClick={handleOpenModal}>
            запросить переназначение
          </Button>
        </Box>
      </Paper>

      <ReassignmentModal open={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitReassignment} />
    </>
  )
}

export default TaskCard
