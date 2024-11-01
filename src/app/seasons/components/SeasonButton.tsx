import { Season } from '@/app/utils/entity'
import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import Link from 'next/link'

const SeasonButton = ({ season }: { season: Season }) => {
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={handleOpen} sx={{ border: '1px solid', margin: '1rem' }}>
        {season.year}
      </Button>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <Stack spacing={2} direction="row">
            {season.seasons.map((subSeason, index) => {
              return (
                <Button sx={{ border: '1px solid' }} key={index}>
                  <Link href={`/${season.year}`} />
                  {subSeason}
                </Button>
              )
            })}
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

export { SeasonButton }
