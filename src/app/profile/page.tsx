'use client'
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Box, Typography, Avatar, Button, TextField } from '@mui/material'
import { AuthContextType } from '../utils/entity'

const ProfilePage = () => {
  const { getUser, logout } = useAuth() as AuthContextType

  const handleProfileUpdate = () => {
    alert('Profile update functionality coming soon!')
  }

  const user = getUser()

  console.log('user', user)

  if (!user || user === null) {
    window.location.href = '/'
  }

  if (user === null) return null //to get rid of typescript error

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4
      }}
    >
      <Avatar
        alt={user.username}
        src={user.profilePicture || '/default-profile.png'}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        {user.username}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.email || 'No email set'}
      </Typography>
      <Box component="form" sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          defaultValue={user.username}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          defaultValue={user.email}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleProfileUpdate}
        >
          Update Profile
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 1 }}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  )
}

export default ProfilePage
