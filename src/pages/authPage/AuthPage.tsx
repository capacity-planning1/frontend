import { useState } from 'react'

import { Paper } from '@mui/material'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import SwitchBlock from './components/SwitchBlock'
import './Auth.scss'

function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <div className='auth-page'>
      <div className='auth-page__stage'>
        <Paper elevation={0} className={`auth-card ${mode === 'login' ? 'auth-card--login' : 'auth-card--register'}`}>
          <div className='auth-card__panel auth-card__panel--left'>
            <div className={`auth-card__content ${mode === 'login' ? 'is-active' : 'is-hidden'}`}>
              <LoginForm onSwitch={() => setMode('register')} />
            </div>

            <div className={`auth-card__content ${mode === 'register' ? 'is-active' : 'is-hidden'}`}>
              <SwitchBlock tab='вход' message='У меня уже есть аккаунт' onClick={() => setMode('login')} />
            </div>
          </div>

          <div className='auth-card__panel auth-card__panel--right'>
            <div className={`auth-card__content ${mode === 'login' ? 'is-active' : 'is-hidden'}`}>
              <SwitchBlock tab='регистрация' message='У меня нет аккаунта' onClick={() => setMode('register')} />
            </div>

            <div className={`auth-card__content ${mode === 'register' ? 'is-active' : 'is-hidden'}`}>
              <RegisterForm onSwitch={() => setMode('login')} />
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default AuthPage
