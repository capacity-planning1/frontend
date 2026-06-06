import { useState, useEffect, useCallback } from 'react'

import { Box, CircularProgress, Typography, Button } from '@mui/material'

import './Projects.scss'
import { client } from '../../api/client'
import AppHeader from '../components/AppHeader'

import '../components/AppHeader.scss'
import ProjectsList from './components/ProjectsList'

export interface Project {
  id: string
  name: string
  description: string
  peopleCount: number
  activeTasks: number
}

// Реальный ответ бэка (устаревшая schema.ts не совпадает — типизируем вручную)
interface ApiProject {
  id: string
  name: string
  description: string | null
}
interface ProjectListApiResponse {
  items: ApiProject[]
  info: { total: number; page: number; page_num: number }
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      // «Мои проекты» = проекты текущего пользователя (фильтр по владельцу)
      const ownerId = localStorage.getItem('student_id')
      const response = await (client.GET as any)('/projects/', {
        params: { query: ownerId ? { owner_student_id: ownerId } : {} },
      })
      if (response?.error) {
        setError('Ошибка загрузки проектов')
      } else if (response?.data) {
        const data = response.data as ProjectListApiResponse
        const mapped: Project[] = data.items.map((p) => ({
          id: String(p.id),
          name: p.name,
          description: p.description ?? 'Описание отсутствует',
          peopleCount: 0,
          activeTasks: 0,
        }))
        setProjects(mapped)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  if (loading) {
    return (
      <Box className='my-projects-page'>
        <AppHeader />
        <Box className='projects-content'>
          <Box className='loading-container'>
            <CircularProgress />
            <Typography className='loading-text'>Загрузка проектов...</Typography>
          </Box>
        </Box>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className='my-projects-page'>
        <AppHeader />
        <Box className='projects-content'>
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
    <Box className='my-projects-page'>
      <AppHeader />
      <Box className='projects-content'>
        <ProjectsList projects={projects} onChanged={fetchProjects} />
      </Box>
    </Box>
  )
}

export default Projects
