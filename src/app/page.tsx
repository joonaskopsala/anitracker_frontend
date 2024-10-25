'use client'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import AnimeCard from './components/Card'
import { useEffect, useState } from 'react'

interface Anime {
  title: string
  episodes: string
  airingStart: string
  coverImage: string
}

const AiringAnimePage: React.FC = () => {
  const [airingAnime, setAiringAnime] = useState<Anime[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/airing_anime')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const formattedData = data.map((anime: any) => ({
          title: anime.title,
          episodes: anime.episodes,
          airingStart: anime.aired.from,
          coverImage: anime.images.jpg.large_image_url
        }))
        setAiringAnime(formattedData)
      })
      .catch((error) => {
        console.error('Error fetching: ', error)
      })
  }, [])

  return (
    <Container>
      <Grid container spacing={4}>
        {airingAnime.map((anime, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <AnimeCard
              title={anime.title}
              episodes={anime.episodes}
              airingStart={anime.airingStart}
              coverImage={anime.coverImage}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default AiringAnimePage
