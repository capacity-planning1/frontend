import { useState } from 'react'

import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { client } from '../../../api/client'

interface LoginFormProps {
  onSwitch: () => void
}

function LoginForm({ onSwitch }: LoginFormProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // /auth/login отсутствует в устаревшей schema.ts — обходим типы
      const response = await (client.POST as any)('/auth/login', {
        body: { email, password },
      })
      const token = response?.data?.access_token
      if (!token) {
        setError('Не удалось получить токен')
        return
      }
      localStorage.setItem('access_token', token)
      // student id = claim `sub` из JWT (нужен для создания проекта)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload?.sub) localStorage.setItem('student_id', payload.sub)
      } catch {
        // не критично
      }
      navigate('/projects')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='form-block' onSubmit={handleSubmit}>
      <Typography className='form-block__tab'>вход</Typography>

      <Box className='form-block__fields'>
        <TextField
          fullWidth
          size='small'
          variant='filled'
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
        <TextField
          fullWidth
          size='small'
          variant='filled'
          label='Пароль'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
      </Box>

      {error && <Typography color='error'>{error}</Typography>}

      <FormControlLabel className='form-block__checkbox' control={<Checkbox size='small' />} label='запомнить меня' />

      <Button type='submit' variant='text' className='form-block__submit' disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </Button>

      <Button type='button' variant='text' className='form-block__switch-mobile' onClick={onSwitch}>
        У меня нет аккаунта
      </Button>
    </form>
  )
}
export default LoginForm
