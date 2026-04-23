// App.tsx - временная версия только для страницы Мои проекты
import React from 'react'

import { ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Projects from './pages/ProjectsPage/Projects'
import { theme } from './styles/theme'

// Импортируем только страницу проектов

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* Все пути ведут на страницу проектов */}
          <Route path='/' element={<Projects />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
