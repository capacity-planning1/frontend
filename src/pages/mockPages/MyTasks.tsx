import { useState, useEffect } from 'react'

import { Box, CircularProgress, Typography, Button } from '@mui/material'

import AppHeader from '../components/AppHeader'

import '../components/AppHeader.scss'
import './MyTasks.scss'
import TasksList from '../TasksPage/components/TasksList'

export interface Task {
  id: number
  title: string
  description: string
  remainingTime: string
  plannedTime: string
}

const mockTasks = [
  { id: 1, title: 'Разработка интерфейса', description: 'Создать главную страницу с использованием Material UI', status: 'in_progress' },
  { id: 2, title: 'Настройка API', description: 'Интеграция с бэкендом и настройка эндпоинтов', status: 'in_progress' },
  { id: 3, title: 'Тестирование', description: 'Написание unit и интеграционных тестов', status: 'pending' },
  { id: 4, title: 'Документация', description: 'Обновить документацию проекта', status: 'in_progress' },
]

const mockTimeStats = [
  { remainingTime: '2 ч 15 мин', plannedTime: '4 ч 00 мин' },
  { remainingTime: '1 ч 30 мин', plannedTime: '3 ч 00 мин' },
  { remainingTime: '0 ч 45 мин', plannedTime: '2 ч 00 мин' },
  { remainingTime: '3 ч 00 мин', plannedTime: '5 ч 00 мин' },
]

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        setError(null)

        const formattedTasks: Task[] = mockTasks.map((item, index) => ({
          id: item.id,
          title: item.title,
          description: item.description || 'Описание отсутствует',
          remainingTime: mockTimeStats[index % mockTimeStats.length].remainingTime,
          plannedTime: mockTimeStats[index % mockTimeStats.length].plannedTime,
        }))

        setTasks(formattedTasks)
      } catch (err) {
        console.error('Fetch error:', err)
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Неизвестная ошибка')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  if (loading) {
    return (
      <Box className='my-tasks-page'>
        <AppHeader />
        <Box className='tasks-content'>
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
      <Box className='my-tasks-page'>
        <AppHeader />
        <Box className='tasks-content'>
          <Box className='error-container'>
            <Typography className='error-text'>Ошибка: {error}</Typography>
            <Button variant='outlined' onClick={() => window.location.reload()}>
              Попробовать снова
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box className='my-tasks-page'>
      <AppHeader />
      <Box className='tasks-content'>
        <TasksList tasks={tasks} />
      </Box>
    </Box>
  )
}

export default Tasks