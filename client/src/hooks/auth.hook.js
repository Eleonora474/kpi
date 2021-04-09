import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const login = useCallback((jwtToken, _isAdmin) => {
    setToken(jwtToken)
    setIsAdmin(_isAdmin)

    localStorage.setItem(
      storageName,
      JSON.stringify({ token: jwtToken, isAdmin: _isAdmin })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.isAdmin)
    }
  }, [login])

  return { login, logout, token, isAdmin }
}
