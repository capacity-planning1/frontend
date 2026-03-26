import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProjectDetail from './pages/ProjectDetails'
import Projects from './pages/Projects'
import Sprints from './pages/Sprints'
import StudentDetail from './pages/StudentDetails'
import Students from './pages/Students'
import Tasks from './pages/TasksPage/Tasks'
import Teams from './pages/Teams'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
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
            path='/projects/:id'
            element={
              <PrivateRoute>
                <ProjectDetail />
              </PrivateRoute>
            }
          />

          <Route
            path='/students'
            element={
              <PrivateRoute>
                <Students />
              </PrivateRoute>
            }
          />

          <Route
            path='/students/:id'
            element={
              <PrivateRoute>
                <StudentDetail />
              </PrivateRoute>
            }
          />

          <Route
            path='/teams'
            element={
              <PrivateRoute>
                <Teams />
              </PrivateRoute>
            }
          />

          <Route
            path='/sprints'
            element={
              <PrivateRoute>
                <Sprints />
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
      </div>
    </BrowserRouter>
  )
}

export default App
