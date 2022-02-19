import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAccount, setConnected } from '../Features/walletSlice'
import { RootState } from '../store'
import { connectWallet, getAccounts } from '../Utils/etherManager'

const Topbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const connected = useSelector((state: RootState) => state.wallet.connected)

  const onHomeClicked = () => {
    navigate('/')
  }

  const onMyListClicked = () => {
    navigate('/list')
  }

  const onMintClicked = () => {
    navigate('/mint')
  }

  const onConnectClicked = async () => {
    await connectWallet()
    const accounts = await getAccounts()
    if (accounts && accounts.length > 0) {
      dispatch(setConnected(true))
      dispatch(setAccount(accounts[0]))
    }
  }

  return (
    <AppBar sx={{ position: 'static' }}>
      <Toolbar>
        <Typography
          onClick={onHomeClicked}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
        >
          Awesome NFT
        </Typography>
        {connected ? (
          <>
            <Button onClick={onMyListClicked}>My list</Button>
            <Button variant="contained" sx={{ ml: 3 }} onClick={onMintClicked}>
              Mint!
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={onConnectClicked}>
            Connect
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
