import React, { useEffect, useState } from 'react'

import { Box, CircularProgress, Paper, Typography } from '@mui/material'

import { client } from '../api/client'

import AppHeader from './components/AppHeader'
import './components/AppHeader.scss'

interface ProfileData {
  id: number
  email: string
  first_name: string
  last_name: string
  registered_at: string
  skills?: string | null
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await client.GET('/students/profile')

        if (response.error) {
          setError('Ошибка загрузки профиля')
          console.error('API Error:', response.error)
        } else if (response.data) {
          setProfile(response.data)
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

    fetchProfile()
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#d9d9d9' }}>
      <AppHeader />
      <Box sx={{ p: 4, maxWidth: 720, mx: 'auto' }}>
        <Typography variant='h4' sx={{ mb: 3, color: '#1a1a1a' }}>
          Профиль студента
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ color: '#b00020' }}>{error}</Typography>
        ) : !profile ? (
          <Typography sx={{ color: '#1a1a1a' }}>Профиль не найден</Typography>
        ) : (
          <Paper elevation={0} sx={{ p: 3, bgcolor: '#fff' }}>
            <Typography variant='h5' sx={{ mb: 2, color: '#1a1a1a' }}>
              {profile.first_name} {profile.last_name}
            </Typography>
            <Typography sx={{ color: '#1a1a1a', mb: 1 }}>Email: {profile.email}</Typography>
            <Typography sx={{ color: '#1a1a1a' }}>Навыки: {profile.skills || 'не указаны'}</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  )
}

export default Profile
