'use client'

import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import darkTheme from '../theme'

const Layout: React.FC = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Airing Anime Tracker</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <header>
            <h1>Airing Anime Tracker</h1>
          </header>
          <main>{children}</main>
          <footer>
            <p>&copy; 2024 Anime Tracker</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default Layout
