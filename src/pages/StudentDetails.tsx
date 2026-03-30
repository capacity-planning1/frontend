import React, { useEffect, useState } from 'react'

import { useParams, Link, useNavigate } from 'react-router-dom'

import { client } from '../api/client'

interface Student {
  id: number
  email: string
  first_name: string
  last_name: string
  registered_at: string
  skills: string | null
}

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    skills: '',
  })

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return

      try {
        setLoading(true)
        const response = await client.GET('/students/{student_id}', {
          params: {
            path: {
              student_id: parseInt(id),
            },
          },
        })

        if (response.error) {
          setError('Ошибка загрузки студента')
          console.error('API Error:', response.error)
        } else if (response.data) {
          const data = response.data as Student
          setStudent(data)
          setEditForm({
            first_name: data.first_name,
            last_name: data.last_name,
            skills: data.skills || '',
          })
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

    fetchStudent()
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    try {
      const response = await client.PUT('/students/{student_id}', {
        params: {
          path: {
            student_id: parseInt(id),
          },
        },
        body: {
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          skills: editForm.skills || null,
        },
      })

      if (response.error) {
        setError('Ошибка обновления студента')
        console.error('API Error:', response.error)
      } else if (response.data) {
        setStudent(response.data as Student)
        setIsEditing(false)
        setError('')
      }
    } catch (err) {
      console.error('Update error:', err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Неизвестная ошибка')
      }
    }
  }

  const handleDelete = async () => {
    if (!id) return

    if (window.confirm('Вы уверены, что хотите удалить этого студента?')) {
      try {
        const response = await client.DELETE('/students/{student_id}', {
          params: {
            path: {
              student_id: parseInt(id),
            },
          },
        })

        if (response.error) {
          setError('Ошибка удаления студента')
          console.error('API Error:', response.error)
        } else {
          navigate('/students')
        }
      } catch (err) {
        console.error('Delete error:', err)
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Неизвестная ошибка')
        }
      }
    }
  }

  if (loading) return <h2>Загрузка...</h2>
  if (error) return <h2>Ошибка: {error}</h2>
  if (!student) return <h2>Студент не найден</h2>

  return (
    <div>
      <h2>Студент ID: {student.id}</h2>
    </div>
  )
}

export default StudentDetail
