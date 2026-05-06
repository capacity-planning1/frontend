import { useState, type FormEvent } from 'react'

import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { login } from '../../../api'

interface LoginFormProps {
  onSwitch: () => void
}

function LoginForm({ onSwitch }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { access_token } = await login({ email, password })
      localStorage.setItem('access_token', access_token)
      navigate('/')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error?.message || 'Ошибка авторизации')
      } else {
        setError('Ошибка соединения с сервером')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className='form-block'
      onSubmit={handleSubmit}
    >
      <Typography className='form-block__tab'>вход</Typography>

      <Box className='form-block__fields'>
        <TextField
          fullWidth
          size='small'
          variant='filled'
          label='Email'
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

      <FormControlLabel className='form-block__checkbox' control={<Checkbox size='small' />} label='запомнить меня' />

      {error && (
        <Typography
          className='form-block__error'
          color='error'
          variant='caption'
        >
          {error}
        </Typography>
      )}

      <Button
        type='submit'
        variant='text'
        className='form-block__submit'
        disabled={loading}
      >
        Войти
      </Button>

      <Button variant='text' className='form-block__switch-mobile' onClick={onSwitch}>
        У меня нет аккаунта
      </Button>
    </form>
  )
}
export default LoginForm
