import { Box, Button, TextField, Typography } from '@mui/material'
interface RegisterFormProps {
  onSwitch: () => void
}
function RegisterForm({ onSwitch }: RegisterFormProps) {
  return (
    <div className='form-block'>
      <Typography className='form-block__tab'>регистрация</Typography>

      <Box className='form-block__fields'>
        <TextField fullWidth size='small' variant='filled' label='Имя' InputProps={{ disableUnderline: true }} />
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

      <Button variant='text' className='form-block__submit'>
        Зарегистрироваться
      </Button>

      <Button variant='text' className='form-block__switch-mobile' onClick={onSwitch}>
        У меня уже есть аккаунт
      </Button>
    </div>
  )
}
export default RegisterForm
