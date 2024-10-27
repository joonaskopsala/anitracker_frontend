import Box from '@mui/material/Box'
import Image from 'next/image'

const SpinningIcon = () => (
  <Box
    component="div"
    sx={{
      animation: 'spin 1s linear infinite',
      '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      }
    }}
  >
    <Image src="/favicon.ico" alt="Loading" width={50} height={50} />
  </Box>
)

export { SpinningIcon }
