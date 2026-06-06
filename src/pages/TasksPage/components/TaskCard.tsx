import { useState } from 'react'

import { Box, Paper, Button, Typography } from '@mui/material'

import { client } from '../../../api/client'
import projectLogo from '../../../assets/images/project-logo.jpg'

import ReassignmentModal from './ReassignmentModal'
import '../MyTasks.scss'

interface Task {
  id: string
  projectId: string
  title: string
  description: string
  remainingTime: string
  plannedTime: string
  status: string
  priority: string
  sprintId: string | null
}

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Задача уже «принята», если она вышла из статуса open
  const [accepted, setAccepted] = useState(task.status !== 'open')
  const [accepting, setAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reassignRequested, setReassignRequested] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // «Принять задачу» = взять в работу: переводим статус в in_progress (persist на бэк)
  const handleAccept = async () => {
    setAccepting(true)
    setError(null)
    try {
      await (client.PUT as any)('/projects/{project_id}/sprints/tasks/{task_id}', {
        params: { path: { project_id: task.projectId, task_id: task.id } },
        body: {
          title: task.title,
          description: task.description || null,
          status: 'in_progress',
          priority: task.priority,
          sprint_id: task.sprintId,
        },
      })
      setAccepted(true)
    } catch {
      setError('Не удалось принять задачу')
    } finally {
      setAccepting(false)
    }
  }

  const handleSubmitReassignment = (reason: string) => {
    console.log(`Запрос переназначения для задачи "${task.title}": ${reason}`)
    setReassignRequested(true)
  }

  return (
    <>
      <Paper className='task-card' elevation={0}>
        <Box className='task-avatar'>
          <Box component='img' src={projectLogo} alt='Project logo' className='project-logo' />
        </Box>

        <Box className='task-info'>
          <Typography className='task-title'>{task.title}</Typography>
          <Typography className='task-description'>{task.description || 'Описание отсутствует'}</Typography>
          <Typography className='task-time'>Кол-во оставшегося времени / кол-во запланированного времени</Typography>
          <Typography className='task-time-values'>
            {task.remainingTime} / {task.plannedTime}
          </Typography>
        </Box>

        <Box className='task-actions'>
          <Button
            variant='outlined'
            size='small'
            className='action-btn'
            onClick={handleAccept}
            disabled={accepted || accepting}
          >
            {accepted ? 'принято ✓' : accepting ? 'принятие…' : 'принять задачу'}
          </Button>
          {error && (
            <Typography color='error' sx={{ fontSize: 12 }}>
              {error}
            </Typography>
          )}
          <Button
            variant='outlined'
            size='small'
            className='action-btn'
            onClick={handleOpenModal}
            disabled={reassignRequested}
          >
            {reassignRequested ? 'переназначение запрошено' : 'запросить переназначение'}
          </Button>
        </Box>
      </Paper>

      <ReassignmentModal open={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitReassignment} />
    </>
  )
}

export default TaskCard
