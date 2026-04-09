import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { client } from '../api/client'

interface Project {
  id: number
  name: string
  description: string | null
  created_at: string
  owner_student_id: number
}

interface ProjectsResponse {
  items: Project[]
  total: number
  page: number
  page_size: number
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await client.GET('/projects', {
          params: {
            query: {
              page: page,
              page_size: 10,
            },
          },
        })

        if (response.error) {
          setError('Ошибка загрузки проектов')
          console.error('API Error:', response.error)
        } else if (response.data) {
          const data = response.data as ProjectsResponse
          setProjects(data.items)
          setTotalPages(Math.ceil(data.total / data.page_size))
        }
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
  }, [page])

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  if (loading) return <h2>Загрузка проектов...</h2>
  if (error) return <h2>Ошибка: {error}</h2>

  return (
    <div>
      <h2>Список проектов</h2>
    </div>
  )
}

export default Projects