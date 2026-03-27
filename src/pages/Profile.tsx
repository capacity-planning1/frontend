import React, { useEffect, useState } from 'react'

import { client } from '../api/client'

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

  if (loading) return <h2>Загрузка...</h2>
  if (error) return <h2>Ошибка: {error}</h2>
  if (!profile) return <h2>Профиль не найден</h2>

  return (
    <div>
      <h2>Профиль студента</h2>
      <p>
        Имя: {profile.first_name} {profile.last_name}
      </p>
      <p>Email: {profile.email}</p>
      <p>Навыки: {profile.skills || 'не указаны'}</p>
    </div>
  )
}

export default Profile
