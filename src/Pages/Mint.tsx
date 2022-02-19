import { Box, Button, Typography, useTheme } from '@mui/material'
import Topbar from '../Components/Topbar'
import { useSelector } from 'react-redux'
import { mint } from '../Utils/etherManager'
import { RootState } from '../store'
import { useEffect, useState } from 'react'

const Mint = () => {
  const theme = useTheme()
  const account = useSelector((state: RootState) => state.wallet.account)
  const [mintState, setMintState] = useState<boolean>()

  useEffect(() => {}, [])

  const onMintClicked = async () => {
    setMintState(await mint(account))
  }

  return (
    <>
      <Topbar />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ align: 'center' }}>
          Mint your NFT!
        </Typography>
        <Typography variant="caption" sx={{ align: 'center' }}>
          Price 0.01 ETH + Gas fees
        </Typography>
        <Button onClick={onMintClicked} variant="outlined" sx={{ mt: 2 }}>
          Mint!
        </Button>
        {mintState === false && (
          <Typography sx={{ mt: 1, color: theme.palette.error.main }}>
            Something went wront during the transaction!
          </Typography>
        )}
        {mintState === true && (
          <Typography sx={{ mt: 1, color: theme.palette.success.main }}>
            Thanks! Your NFT has been minted successfully!
          </Typography>
        )}
      </Box>
    </>
  )
}

export default Mint
