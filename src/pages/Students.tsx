import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { client } from '../api/client'

interface Student {
  id: number
  email: string
  first_name: string
  last_name: string
  registered_at: string
  skills: string | null
}

interface StudentsResponse {
  items: Student[]
  total: number
  page: number
  page_size: number
}

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)

        const queryParams: any = {
          page: page,
          page_size: 10,
        }

        if (searchTerm) {
          queryParams.first_name = searchTerm
          queryParams.last_name = searchTerm
        }

        const response = await client.GET('/students', {
          params: {
            query: queryParams,
          },
        })

        if (response.error) {
          setError('Ошибка загрузки студентов')
          console.error('API Error:', response.error)
        } else if (response.data) {
          const data = response.data as StudentsResponse
          setStudents(data.items)
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

    fetchStudents()
  }, [page, searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(searchInput)
    setPage(1)
  }

  const handleClearSearch = () => {
    setSearchInput('')
    setSearchTerm('')
    setPage(1)
  }

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

  if (loading) return <h2>Загрузка студентов...</h2>
  if (error) return <h2>Ошибка: {error}</h2>

  return (
    <div>
      <h2>Список студентов</h2>
    </div>
  )
}

export default Students
