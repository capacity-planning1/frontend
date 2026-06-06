import React from 'react'

import { ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthPage from './pages/authPage/AuthPage'
import Profile from './pages/Profile'
import ProjectDetail from './pages/ProjectDetails'
import Projects from './pages/ProjectsPage/Projects'
import SprintBoard from './pages/SprintBoardPage/SprintBoard'
import Sprints from './pages/Sprints'
import StudentDetail from './pages/StudentDetails'
import Students from './pages/Students'
import Tasks from './pages/TasksPage/Tasks'
import Teams from './pages/Teams'
import Workload from './pages/WorkloadPage/Workload'
import { theme } from './styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<AuthPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:id' element={<ProjectDetail />} />
          <Route path='/students' element={<Students />} />
          <Route path='/students/:id' element={<StudentDetail />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/sprints' element={<Sprints />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/sprint-board' element={<SprintBoard />} />
          <Route path='/workload' element={<Workload />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
