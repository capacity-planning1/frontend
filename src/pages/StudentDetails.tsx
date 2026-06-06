import React, { useEffect, useState } from 'react'

import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useParams, Link } from 'react-router-dom'

import { client } from '../api/client'

import AppHeader from './components/AppHeader'
import './components/AppHeader.scss'

// id студента — UUID-строка (schema.ts ошибочно указывает number)
interface Student {
  id: string
  email: string
  first_name: string
  last_name: string
  skills: string | null
  created_at?: string
}

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    const fetchStudent = async () => {
      try {
        // id — UUID-строка, передаём как есть (раньше был parseInt → /students/0 → 422)
        const res = await (client.GET as any)('/students/{student_id}', {
          params: { path: { student_id: id } },
        })
        setStudent(res?.data ?? null)
      } catch {
        setError('Не удалось загрузить студента')
      } finally {
        setLoading(false)
      }
    }
    fetchStudent()
  }, [id])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#d9d9d9' }}>
      <AppHeader />
      <Box sx={{ p: 4, maxWidth: 720, mx: 'auto' }}>
        <Typography component={Link} to='/students' sx={{ color: '#1565c0', textDecoration: 'none', fontSize: 14 }}>
          ← К списку студентов
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ color: '#b00020', mt: 2 }}>{error}</Typography>
        ) : !student ? (
          <Typography sx={{ color: '#1a1a1a', mt: 2 }}>Студент не найден</Typography>
        ) : (
          <Paper elevation={0} sx={{ p: 3, mt: 2, bgcolor: '#fff' }}>
            <Typography variant='h5' sx={{ mb: 2, color: '#1a1a1a' }}>
              {student.first_name} {student.last_name}
            </Typography>
            <Typography sx={{ color: '#1a1a1a', mb: 1 }}>Email: {student.email}</Typography>
            <Typography sx={{ color: '#1a1a1a', mb: 1 }}>Навыки: {student.skills || '—'}</Typography>
            {student.created_at && (
              <Typography sx={{ color: '#666', fontSize: 14 }}>
                Зарегистрирован: {student.created_at.slice(0, 10)}
              </Typography>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  )
}

export default StudentDetail
