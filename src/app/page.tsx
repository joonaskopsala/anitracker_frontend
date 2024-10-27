'use client'
import AnimeCard from './components/Card'
import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import { Anime, ApiAnime } from './utils/entity'
import TemporaryDrawer from './components/DrawerList'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { formatAiringAnime } from './utils/utils'

const AiringAnimePage = () => {
  const [airingAnime, setAiringAnime] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAiringAnime = async () => {
      try {
        const apiResponse = await fetch('http://localhost:5000/airing_anime')
        const formattedAnime = await formatAiringAnime(apiResponse)
        setAiringAnime(formattedAnime)
      } catch (error) {
        console.error('Error fetching anime:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAiringAnime()
  }, [])

  return (
    <>
      <TemporaryDrawer />
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', margin: '2rem 0', width: '100%' }}
      >
        {'Airing Anime'}
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
          <CircularProgress />
        ) : airingAnime.length === 0 ? (
          <Typography>{'No anime found, could be an API error :('}</Typography>
        ) : (
          <Stack
            justifyContent="center"
            direction="row"
            spacing={6}
            useFlexGap
            sx={{ flexWrap: 'wrap', maxWidth: '60%' }}
          >
            {airingAnime.map((anime, index) => (
              <AnimeCard anime={anime} key={index} />
            ))}
          </Stack>
        )}
      </Box>
    </>
  )
}

export default AiringAnimePage
