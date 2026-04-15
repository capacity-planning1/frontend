import { useState } from 'react'

import { Box, Paper, Button, ThemeProvider } from '@mui/material'

import appLogo from '../../assets/images/app-logo.jpg'
import { theme } from '../../styles/theme'
import './MyTasks.scss'

import TasksList from './components/TasksList'

interface Task {
  id: number
  title: string
  description: string
  remainingTime: string
  plannedTime: string
}

const Tasks = () => {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Название задачи',
      description: 'Описание',
      remainingTime: '2 ч 15 мин',
      plannedTime: '4 ч 00 мин',
    },
    {
      id: 2,
      title: 'Название задачи',
      description: 'Описание',
      remainingTime: '1 ч 30 мин',
      plannedTime: '3 ч 00 мин',
    },
    {
      id: 3,
      title: 'Название задачи',
      description: 'Описание',
      remainingTime: '0 ч 45 мин',
      plannedTime: '2 ч 00 мин',
    },
  ])

  return (
    <ThemeProvider theme={theme}>
      <Box className='my-tasks-page'>
        <Paper className='tasks-header' elevation={0} square sx={{ borderRadius: 0 }}>
          <Box className='header-left'>
            <Box className='header-avatar'>
              <Box component='img' src={appLogo} alt='Header project logo' className='header-logo' />
            </Box>
            <Box className='tasks-tabs'>
              <Button className='tasks-tab' disableRipple sx={{ textTransform: 'none' }}>
                Мои проекты
              </Button>
              <Button className='tasks-tab active' disableRipple sx={{ textTransform: 'none' }}>
                Мои задачи
              </Button>
            </Box>
          </Box>
          <Button className='tasks-logout' disableRipple sx={{ textTransform: 'none' }}>
            Выйти
          </Button>
        </Paper>

        <Box className='tasks-content'>
          <TasksList tasks={tasks} />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Tasks
