import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import 'materialize-css'

function App() {
  const { token, login, logout, isAdmin } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated, isAdmin)
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAdmin,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
