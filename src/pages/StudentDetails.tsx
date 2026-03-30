import React, { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import useApi from '../hooks/useApi'

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
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    skills: '',
  })

  const { data: student, loading, error, execute: fetchStudent } = useApi<Student>('GET', '/students/{student_id}')

  const {
    loading: updateLoading,
    error: updateError,
    execute: updateStudent,
  } = useApi<Student>('PUT', '/students/{student_id}')

  const {
    loading: deleteLoading,
    error: deleteError,
    execute: deleteStudent,
  } = useApi('DELETE', '/students/{student_id}')

  useEffect(() => {
    if (id) {
      fetchStudent({
        params: {
          path: { student_id: parseInt(id) },
        },
      })
    }
  }, [id, fetchStudent])

  useEffect(() => {
    if (student) {
      setEditForm({
        first_name: student.first_name,
        last_name: student.last_name,
        skills: student.skills || '',
      })
    }
  }, [student])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    await updateStudent({
      params: {
        path: { student_id: parseInt(id) },
      },
      body: {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        skills: editForm.skills || null,
      },
    })

    if (!updateError) {
      setIsEditing(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return

    if (window.confirm('Вы уверены, что хотите удалить этого студента?')) {
      await deleteStudent({
        params: {
          path: { student_id: parseInt(id) },
        },
      })

      if (!deleteError) {
        navigate('/students')
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
