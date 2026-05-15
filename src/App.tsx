import React from 'react'

import { ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import AuthPage from './pages/authPage/AuthPage'
import Projects from './pages/ProjectsPage/Projects'
import SprintBoard from './pages/SprintBoardPage/SprintBoard'
import Tasks from './pages/TasksPage/Tasks'
import { theme } from './styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<AuthPage />} />
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path='/projects'
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path='/sprint-board'
            element={
              <PrivateRoute>
                <SprintBoard />
              </PrivateRoute>
            }
          />
          <Route
            path='/tasks'
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
