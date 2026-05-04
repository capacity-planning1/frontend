import { useState, useEffect } from 'react'

import { Box, CircularProgress, Typography, Button } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { client } from '../../api/client'
import type { components } from '../../api/schema'
import AppHeader from '../components/AppHeader'

import TaskColumn from './components/TaskColumn'
import '../components/AppHeader.scss'
import './SprintBoard.scss'

type ProjectTaskResponse = components['schemas']['ProjectTaskResponse']
type TaskStatus = components['schemas']['TaskStatus']

const mapStatusToColumn = (status: TaskStatus): string => {
  switch (status) {
    case 'unassigned':
      return 'open'
    case 'assigned':
      return 'open'
    case 'in_progress':
      return 'in_progress'
    case 'done':
      return 'done'
    default:
      return 'open'
  } //не хватает статусов в schema.ts (тестирование, ревью)
}

interface Task {
  id: number
  number: string
  assignee: string
  status: string
}

const SprintBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [projectId, setProjectId] = useState<number | null>(null)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const projectIdFromUrl = searchParams.get('projectId')
    if (projectIdFromUrl) {
      setProjectId(Number(projectIdFromUrl))
    } else {
      setError('ID проекта не указан')
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    if (projectId) {
      fetchTasks()
    }
  }, [projectId])

  const fetchTasks = async () => {
    if (!projectId) return

    setLoading(true)
    setError(null)

    try {
      const response = await client.GET('/projects/{project_id}/tasks', {
        params: {
          path: { project_id: projectId },
          query: { page: 1, page_size: 100 },
        },
      })

      if (response.error) {
        setError('Ошибка загрузки задач')
        console.error('API Error:', response.error)
        return
      }

      if (!response.data) {
        setError('Нет данных от сервера')
        return
      }

      const formattedTasks: Task[] = response.data.items.map((item: ProjectTaskResponse) => ({
        id: item.id,
        number: `TASK-${item.id}`,
        assignee: 'Не назначен', //пока что
        status: mapStatusToColumn(item.status),
      }))

      setTasks(formattedTasks)
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
      setError('Не удалось загрузить задачи')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = () => {
    console.log('Создать задачу')
  }

  const handleInvite = () => {
    console.log('Пригласить участника')
  }

  const handleLoadConfig = () => {
    console.log('Настроить нагрузку')
  }

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status)
  }

  const getButtonHandler = (columnId: string) => {
    if (columnId === 'open') return handleCreateTask
    if (columnId === 'in_progress') return handleInvite
    if (columnId === 'review') return handleLoadConfig
    return undefined
  }

  const columns = [
    { id: 'open', title: 'Открыто', hasButton: true, buttonText: 'Создать задачу' },
    { id: 'in_progress', title: 'В работе', hasButton: true, buttonText: 'Пригласить' },
    { id: 'review', title: 'Ревью', hasButton: true, buttonText: 'Настроить нагрузку' },
    { id: 'testing', title: 'Тестирование', hasButton: false, buttonText: '' },
    { id: 'done', title: 'Выполнено', hasButton: false, buttonText: '' },
  ]

  if (loading) {
    return (
      <Box className='sprint-board-page'>
        <AppHeader />
        <Box className='sprint-board-content'>
          <Box className='loading-container'>
            <CircularProgress />
            <Typography className='loading-text'>Загрузка задач...</Typography>
          </Box>
        </Box>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className='sprint-board-page'>
        <AppHeader />
        <Box className='sprint-board-content'>
          <Box className='error-container'>
            <Typography className='error-text'>Ошибка: {error}</Typography>
            <Button variant='outlined' onClick={() => fetchTasks()}>
              Попробовать снова
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box className='sprint-board-page'>
      <AppHeader />
      <Box className='sprint-board-content'>
        <Box className='columns-wrapper'>
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.title}
              tasks={getTasksByStatus(column.id)}
              hasButton={column.hasButton}
              buttonText={column.buttonText}
              onButtonClick={getButtonHandler(column.id)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default SprintBoard
