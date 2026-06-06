import { useState } from 'react'

import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { client } from '../../../api/client'

interface RegisterFormProps {
  onSwitch: () => void
}

function RegisterForm({ onSwitch }: RegisterFormProps) {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // /auth/register и /auth/login отсутствуют в устаревшей schema.ts — обходим типы
      await (client.POST as any)('/auth/register', {
        body: {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        },
      })
      // авто-вход сразу после регистрации
      const loginRes = await (client.POST as any)('/auth/login', {
        body: { email, password },
      })
      const token = loginRes?.data?.access_token
      if (!token) {
        setError('Регистрация прошла, но войти не удалось')
        return
      }
      localStorage.setItem('access_token', token)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload?.sub) localStorage.setItem('student_id', payload.sub)
      } catch {
        // не критично
      }
      navigate('/projects')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='form-block' onSubmit={handleSubmit}>
      <Typography className='form-block__tab'>регистрация</Typography>

      <Box className='form-block__fields'>
        <TextField
          fullWidth
          size='small'
          variant='filled'
          label='Имя'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
        <TextField
          fullWidth
          size='small'
          variant='filled'
          label='Фамилия'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
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

      <Button type='submit' variant='text' className='form-block__submit' disabled={loading}>
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>

      <Button type='button' variant='text' className='form-block__switch-mobile' onClick={onSwitch}>
        У меня уже есть аккаунт
      </Button>
    </form>
  )
}
export default RegisterForm
