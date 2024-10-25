import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

interface AnimeCardProps {
  title: string
  episodes: string
  airingStart: string
  coverImage: string
}

const AnimeCard: React.FC<AnimeCardProps> = ({
  title,
  episodes,
  airingStart,
  coverImage
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={coverImage} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Episodes: {episodes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Airing Start: {new Date(airingStart).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AnimeCard
