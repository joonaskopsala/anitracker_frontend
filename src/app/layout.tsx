'use client'
import React, {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext
} from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { darkTheme, lightTheme } from '../theme'
import { AuthProvider } from './hooks/useAuth'

const ThemeContext = createContext({
  toggleTheme: () => {}
})

export const useTheme = () => useContext(ThemeContext)

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [theme, setTheme] = useState(lightTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setTheme(savedTheme === 'dark' ? darkTheme : lightTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme.palette.mode === 'dark' ? lightTheme : darkTheme
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme.palette.mode)
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeContext.Provider value={{ toggleTheme }}>
          <html lang="en">
            <head>
              <title>Anime Tracker</title>
              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <link rel="icon" href="/favicon.ico" />
            </head>
            <body>{children}</body>
          </html>
        </ThemeContext.Provider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default Layout
