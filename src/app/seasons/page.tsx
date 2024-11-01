'use client'

import Typography from '@mui/material/Typography'
import TemporaryDrawer from '../components/DrawerList'
import { useEffect, useState } from 'react'
import { Season } from '../utils/entity'
import { SeasonButton } from './components/SeasonButton'
import { SpinningIcon } from '../components/LoadingIcon'
import Box from '@mui/material/Box'
import { Stack } from '@mui/material'

const SeasonsPage = () => {
  const [seasons, setSeasons] = useState<Season[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const apiResponse = await fetch('http://localhost:5000/seasons')
        const seasons = await apiResponse.json()
        setSeasons(seasons)
      } catch (error) {
        console.error('Error fetching seasons:', error)
        setSeasons([])
      } finally {
        setLoading(false)
      }
    }
    fetchSeasons()
  }, [])

  return (
    <>
      <TemporaryDrawer />
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', margin: '2rem 0', width: '100%' }}
      >
        {'Seasons'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          height: '100vh',
          width: '100%'
        }}
      >
        {loading ? (
          <SpinningIcon />
        ) : seasons.length === 0 ? (
          <Typography>
            {'No seasons found, could be an API error :('}
          </Typography>
        ) : (
          <Stack
            justifyContent="center"
            direction="row"
            spacing={0}
            useFlexGap
            sx={{ flexWrap: 'wrap', maxWidth: '60%' }}
          >
            {seasons.map((season, index) => (
              <SeasonButton season={season} key={index} />
            ))}
          </Stack>
        )}
      </Box>
    </>
  )
}

export default SeasonsPage
