import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'

interface LoginFormProps {
  onSwitch: () => void
}

function LoginForm({ onSwitch }: LoginFormProps) {
  return (
    <div className='form-block'>
      <Typography className='form-block__tab'>вход</Typography>

      <Box className='form-block__fields'>
        <TextField fullWidth size='small' variant='filled' label='Email' InputProps={{ disableUnderline: true }} />
        <TextField
          fullWidth
          size='small'
          variant='filled'
          label='Пароль'
          type='password'
          InputProps={{ disableUnderline: true }}
        />
      </Box>

      <FormControlLabel className='form-block__checkbox' control={<Checkbox size='small' />} label='запомнить меня' />

      <Button variant='text' className='form-block__submit'>
        Войти
      </Button>

      <Button variant='text' className='form-block__switch-mobile' onClick={onSwitch}>
        У меня нет аккаунта
      </Button>
    </div>
  )
}
export default LoginForm
