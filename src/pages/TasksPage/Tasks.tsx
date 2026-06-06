import { useState, useEffect } from 'react'

import { Box, CircularProgress, Typography, Button } from '@mui/material'

import { client } from '../../api/client'
import AppHeader from '../components/AppHeader'

import '../components/AppHeader.scss'
import './MyTasks.scss'
import TasksList from './components/TasksList'

export interface Task {
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

// Реальные ответы бэка (устаревшая schema.ts не совпадает — типизируем вручную)
interface ApiProject {
  id: string
}
interface ApiTask {
  id: string
  title: string
  description: string | null
  status: string
  priority?: string
  sprint_id?: string | null
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Глобального «мои задачи» на бэке нет — агрегируем задачи по всем проектам
    const fetchTasks = async () => {
      try {
        // только проекты текущего пользователя (фильтр по владельцу)
        const ownerId = localStorage.getItem('student_id')
        const projectsRes = await (client.GET as any)('/projects/', {
          params: { query: ownerId ? { owner_student_id: ownerId } : {} },
        })
        if (projectsRes?.error) {
          setError('Ошибка загрузки задач')
          return
        }
        const projects: ApiProject[] = projectsRes?.data?.items ?? []
        const all: Task[] = []
        for (const project of projects) {
          const tasksRes = await (client.GET as any)('/projects/{project_id}/sprints/tasks/', {
            params: { path: { project_id: project.id } },
          })
          const items: ApiTask[] = tasksRes?.data?.items ?? []
          for (const t of items) {
            all.push({
              id: String(t.id),
              projectId: project.id,
              title: t.title,
              description: t.description ?? '',
              remainingTime: '—',
              plannedTime: '—',
              status: t.status,
              priority: t.priority ?? 'MEDIUM',
              sprintId: t.sprint_id ?? null,
            })
          }
        }
        setTasks(all)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
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
