import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Switch from '@mui/material/Switch'
import TodayIcon from '@mui/icons-material/Today'
import { Typography } from '@mui/material'
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginDialog from './LoginDialog'
import { useAuth } from '../hooks/useAuth'
import { AuthContextType } from '../utils/entity'
import { useTheme } from '../layout'

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false)
  const { user, logout } = useAuth() as AuthContextType
  const { toggleTheme } = useTheme()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const handleOpenLoginDialog = () => {
    setLoginDialogOpen(true)
  }

  const handleCloseLoginDialog = () => {
    setLoginDialogOpen(false)
  }

  const handleAccountClick = () => {
    if (user) {
      window.location.href = '/profile'
    } else {
      handleOpenLoginDialog()
    }
  }

  let theme = ''
  try {
    theme = localStorage.getItem('theme') || ''
  } catch (err) {
    theme = ''
  }

  const DrawerList = (
    <Box sx={{ width: '15rem' }}>
      <List>
        <ListItem>
          <ListItemButton disableRipple sx={{ justifyContent: 'left' }}>
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <Switch
              disableRipple
              onChange={toggleTheme}
              checked={theme === 'dark'}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            disableRipple
            sx={{ justifyContent: 'left' }}
            onClick={handleAccountClick}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Typography fontSize="1.3rem">
              {user ? user.username : 'Account'}
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton
            disableRipple
            sx={{ justifyContent: 'left' }}
            href="/"
          >
            <ListItemIcon>
              <TodayIcon fontSize="large" />
            </ListItemIcon>
            <Typography fontSize="1.3rem">{'Airing anime'}</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            disableRipple
            sx={{ justifyContent: 'left' }}
            href="/seasons"
          >
            <ListItemIcon>
              <ViewTimelineIcon fontSize="large" />
            </ListItemIcon>
            <Typography fontSize="1.3rem">{'Seasons'}</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 1000
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <LoginDialog open={loginDialogOpen} onClose={handleCloseLoginDialog} />
    </>
  )
}
