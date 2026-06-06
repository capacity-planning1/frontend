import React, { useEffect, useState } from 'react'

import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

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
}

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await (client.GET as any)('/students/', { params: { query: { page_size: 100 } } })
        setStudents(res?.data?.items ?? [])
      } catch {
        setError('Не удалось загрузить студентов')
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#d9d9d9' }}>
      <AppHeader />
      <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
        <Typography variant='h4' sx={{ mb: 3, color: '#1a1a1a' }}>
          Список студентов
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ color: '#b00020' }}>{error}</Typography>
        ) : students.length === 0 ? (
          <Typography sx={{ color: '#1a1a1a' }}>Студенты не найдены</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {students.map((s) => (
              <Paper
                key={s.id}
                component={Link}
                to={`/students/${s.id}`}
                elevation={0}
                sx={{
                  p: 2,
                  textDecoration: 'none',
                  display: 'block',
                  bgcolor: '#fff',
                  transition: 'box-shadow 0.15s ease',
                  '&:hover': { boxShadow: 3 },
                }}
              >
                <Typography sx={{ fontSize: 18, color: '#1a1a1a' }}>
                  {s.first_name} {s.last_name}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#666' }}>{s.email}</Typography>
                {s.skills && <Typography sx={{ fontSize: 14, color: '#666' }}>Навыки: {s.skills}</Typography>}
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Students
