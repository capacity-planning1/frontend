import { useState, useEffect } from 'react'

import { Box, CircularProgress, Typography, Button } from '@mui/material'

import './Projects.scss'
import { client } from '../../api/client'
import type { components } from '../../api/schema'
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

// Тип для ответа от API
type ProjectResponse = components['schemas']['ProjectResponse']
type ProjectListResponse = components['schemas']['ProjectListResponse']

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await client.GET('/projects', {
          params: {
            query: {
              page: 1,
              page_size: 100,
            },
          },
        })

        if (response.error) {
          setError('Ошибка загрузки проектов')
          console.error('API Error:', response.error)
          return
        }

        if (!response.data) {
          setError('Нет данных от сервера')
          return
        }

        const data = response.data as ProjectListResponse

        const formattedProjects: Project[] = await Promise.all(
          data.items.map(async (item: ProjectResponse) => {
            // Получаем количество участников проекта
            let peopleCount = 0
            try {
              const membersResponse = await client.GET('/projects/{project_id}/members', {
                params: {
                  path: { project_id: item.id },
                  query: { page: 1, page_size: 100 },
                },
              })
              if (membersResponse.data) {
                peopleCount = membersResponse.data.items.length
              }
            } catch (err) {
              console.error(`Failed to fetch members for project ${item.id}:`, err)
            }

            // Получаем количество активных задач
            let activeTasks = 0
            try {
              const tasksResponse = await client.GET('/projects/{project_id}/tasks', {
                params: {
                  path: { project_id: item.id },
                  query: { page: 1, page_size: 100 },
                },
              })
              if (tasksResponse.data) {
                // Считаем только задачи со статусом не "done"
                activeTasks = tasksResponse.data.items.filter((task) => task.status !== 'done').length
              }
            } catch (err) {
              console.error(`Failed to fetch tasks for project ${item.id}:`, err)
            }

            return {
              id: item.id,
              name: item.name,
              description: item.description || 'Описание отсутствует',
              peopleCount,
              activeTasks,
            }
          }),
        )

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
