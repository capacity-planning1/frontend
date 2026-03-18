import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Navigation from './components/Navigation'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/Profile'
import ProjectDetail from './components/ProjectDetails'
import Projects from './components/Projects'
import Sprints from './components/Sprints'
import StudentDetail from './components/StudentDetails'
import Students from './components/Students'
import Tasks from './components/Tasks'
import Teams from './components/Teams'

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
