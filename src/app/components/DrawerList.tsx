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
import { useTheme } from '../layout'
import { useEffect } from 'react'

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false)

  const { toggleTheme } = useTheme()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  let theme = ''

  try {
    theme = localStorage.getItem('theme') || ''
  } catch (err) {
    theme = ''
  }

  const DrawerList = (
    <Box sx={{ width: '10rem' }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton disableRipple>
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <Switch
              disableRipple
              onChange={toggleTheme}
              checked={theme === 'dark' ? true : false}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
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
    </>
  )
}
