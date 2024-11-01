import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import { AuthContextType, User } from '../utils/entity'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const login = async (username: string, password: string) => {
    const response = await axios.post('http://localhost:5000/login', {
      username,
      password
    })
    localStorage.setItem('token', response.data.token)
    fetchUserData()
  }

  const getUser = () => user

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const fetchUserData = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await axios.get('http://localhost:5000/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
    } catch {
      logout()
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, login, logout, getUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
