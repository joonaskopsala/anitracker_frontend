import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link, Tooltip } from '@mui/material'
import { Anime } from '../utils/entity'

const AnimeCard = ({ anime }: { anime: Anime }) => {
  return (
    <Card sx={{ width: '15rem', height: '22rem' }}>
      <CardMedia
        component="img"
        height="190rem"
        image={anime.coverImage}
        alt={anime.title}
      />
      <CardContent>
        <Tooltip title={anime.title}>
          <Link
            gutterBottom
            underline="none"
            color="text.primary"
            href={anime.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography
              fontSize="1.1rem"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {anime.title}
            </Typography>
          </Link>
        </Tooltip>
        <Typography color="text.secondary">
          {`Episodes: ${anime.episodes || 'Unknown'}`}
        </Typography>
        <Typography color="text.secondary">
          {`Airing Start: ${new Date(anime.airingStart).toLocaleDateString()}`}
        </Typography>
        <Typography color="text.secondary">
          {!anime.finished
            ? 'Finished airing'
            : anime.timeUntilNextEp
              ? `Next episode in: ${anime.timeUntilNextEp.days} days ${anime.timeUntilNextEp.hours} hours ${anime.timeUntilNextEp.minutes} minutes`
              : ''}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AnimeCard
