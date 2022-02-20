import { Box, Button, Typography, useTheme } from '@mui/material'
import Topbar from '../Components/Topbar'
import { useSelector } from 'react-redux'
import { getMaxSupply, mint, getCurrentSupply } from '../Utils/etherManager'
import { RootState } from '../store'
import { useEffect, useState } from 'react'

const Mint = () => {
  const theme = useTheme()
  const account = useSelector((state: RootState) => state.wallet.account)
  const [mintSuccess, setMintSuccess] = useState<boolean>()
  const [supply, setSupply] = useState<number>()
  const [currentSupply, setCurrentSupply] = useState<number>()

  useEffect(() => {
    const updateSupply = async () => {
      setSupply(await getMaxSupply())
      setCurrentSupply(await getCurrentSupply())
    }
    updateSupply()
  }, [])

  const onMintClicked = async () => {
    setMintSuccess(await mint(account))
  }

  const mintEnabled =
    currentSupply !== undefined && supply !== undefined
      ? currentSupply < supply
      : false

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
        <>
          <Typography variant="h4" sx={{ align: 'center' }}>
            Mint your NFT!
          </Typography>
          <Typography variant="caption" sx={{ align: 'center' }}>
            Price 0.01 ETH + Gas fees
          </Typography>
          <Button
            disabled={!mintEnabled}
            onClick={onMintClicked}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Mint!
          </Button>
          {mintSuccess === false && (
            <Typography sx={{ mt: 1, color: theme.palette.error.main }}>
              Something went wront during the transaction!
            </Typography>
          )}
          {mintSuccess === true && (
            <Typography sx={{ mt: 1, color: theme.palette.success.main }}>
              Thanks! Your NFT has been minted successfully!
            </Typography>
          )}
        </>
      </Box>
    </>
  )
}

export default Mint
