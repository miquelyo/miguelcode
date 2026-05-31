import { useEffect, useState } from 'react'
import { AuthContext } from './authContext'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        console.error(e)
      }
    }
    setLoading(false)
  }, [])

  const login = (email) => {
    const fakeUser = { uid: 'stub-uid', email }
    setUser(fakeUser)
    localStorage.setItem('user', JSON.stringify(fakeUser))
  }

  const register = (email) => {
    const fakeUser = { uid: 'stub-uid', email }
    setUser(fakeUser)
    localStorage.setItem('user', JSON.stringify(fakeUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, register }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}