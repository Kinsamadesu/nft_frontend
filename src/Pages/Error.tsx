import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()

  const onGotoHome = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ align: 'center' }}>Nothing to see here!</Typography>
      <Button onClick={onGotoHome}>Go to Homepage</Button>
    </Box>
  )
}

export default Error
