import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Anime } from '../utils/entity'
import Tooltip from '@mui/material/Tooltip'
import CardActionArea from '@mui/material/CardActionArea'
import Link from '@mui/material/Link'
import Dialog from '@mui/material/Dialog'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import DialogContent from '@mui/material/DialogContent'
import Stack from '@mui/material/Stack'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'

const AnimeCard = ({ anime }: { anime: Anime }) => {
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <CardActionArea
        onClick={handleOpen}
        sx={{ width: '15rem', height: '22rem' }}
      >
        <Card sx={{ height: 'inherit' }}>
          <CardMedia
            component="img"
            height="190rem"
            image={anime.coverImage}
            alt={anime.title}
          />
          <CardContent>
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
      </CardActionArea>

      <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Stack spacing={4} direction="row">
            <CardMedia
              component="img"
              image={anime.coverImage}
              alt={anime.title}
              sx={{ width: '35%', height: 'auto' }}
            />
            <Stack direction="column" spacing={2} sx={{ width: '60%' }}>
              <Typography variant="h5">{anime.title}</Typography>
              <Typography variant="body1">{anime.synopsis}</Typography>
              <Tooltip title={anime.link}>
                <Link
                  color="text.primary"
                  href={anime.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      fontSize="1.1rem"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {'Myanimelist'}
                    </Typography>
                    <OpenInNewIcon fontSize="small" />
                  </Stack>
                </Link>
              </Tooltip>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleClose} color="primary">
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AnimeCard
