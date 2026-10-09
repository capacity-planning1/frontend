import React from 'react'

import { Navigate } from 'react-router-dom'

const isAuthenticated = true
//пока не реализована логика

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}

export default PrivateRoute
