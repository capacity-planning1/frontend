import { useState } from 'react'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { Box, Paper, Button, Badge, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

import appLogo from '../../assets/images/app-logo.jpg'

import NotificationsModal from './NotificationsModal'

const AppHeader = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const handleOpenNotifications = () => {
    setIsNotificationsOpen(true)
  }

  const handleCloseNotifications = () => {
    setIsNotificationsOpen(false)
  }
  return (
    <>
      <Paper
        className='app-header'
        elevation={0}
        square
        sx={{ borderRadius: 0 }}
      >
        <Box className='header-left'>
          <Box className='header-avatar'>
            <Box
              component='img'
              src={appLogo}
              alt='Header logo'
              className='header-logo'
            />
          </Box>
          <Box className='header-tabs'>
            <Button
              component={Link}
              to='/projects'
              className='header-tab'
              disableRipple
              sx={{ textTransform: 'none' }}
            >
              Мои проекты
            </Button>
            <Button
              component={Link}
              to='/tasks'
              className='header-tab'
              disableRipple
              sx={{ textTransform: 'none' }}
            >
              Мои задачи
            </Button>
          </Box>
        </Box>
        <Box className='header-right'>
          <IconButton
            className='notifications-icon'
            onClick={handleOpenNotifications}
          >
            <Badge
              variant='dot'
              color='error'
            >
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <Button
            component={Link}
            to='/login'
            className='header-logout'
            disableRipple
            sx={{ textTransform: 'none' }}
          >
            Выйти
          </Button>
        </Box>
      </Paper>
      <NotificationsModal
        open={isNotificationsOpen}
        onClose={handleCloseNotifications}
      />
    </>
  )
}

export default AppHeader
