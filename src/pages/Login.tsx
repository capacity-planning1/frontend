import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const formData = new URLSearchParams()
      formData.append('grant_type', 'password')
      formData.append('username', email)
      formData.append('password', password)
      formData.append('scope', 'students:read projects:read')

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token)
        navigate('/')
      } else {
        setError(data.error?.message || 'Ошибка авторизации')
      }
    } catch (err) {
      setError('Ошибка соединения с сервером')
    }
  }

  return (
    <div>
      <h2>Страница входа</h2>
    </div>
  )
}

export default Login
