import { useState, useEffect } from 'react'

import { Box, CircularProgress, Typography, Button } from '@mui/material'

import './Projects.scss'
import AppHeader from '../components/AppHeader'

import '../components/AppHeader.scss'
import ProjectsList from './components/ProjectsList'

export interface Project {
  id: number
  name: string
  description: string
  peopleCount: number
  activeTasks: number
}

const mockProjectsData = [
  { id: 1, name: 'CRM Система', description: 'Разработка CRM для отдела продаж', peopleCount: 5, activeTasks: 8 },
  { id: 2, name: 'Мобильное приложение', description: 'Приложение для доставки еды', peopleCount: 3, activeTasks: 12 },
  { id: 3, name: 'Аналитическая платформа', description: 'Дашборды и аналитика данных', peopleCount: 4, activeTasks: 6 },
  { id: 4, name: 'Сайт портфолио', description: 'Личный сайт-портфолио', peopleCount: 1, activeTasks: 3 },
]

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)

        const formattedProjects: Project[] = mockProjectsData.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || 'Описание отсутствует',
          peopleCount: item.peopleCount,
          activeTasks: item.activeTasks,
        }))

        setProjects(formattedProjects)
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

    fetchProjects()
  }, [])

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
        <ProjectsList projects={projects} />
      </Box>
    </Box>
  )
}

export default Projects