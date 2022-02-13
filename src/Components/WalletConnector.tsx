import React, { useCallback, useEffect } from 'react'
import { RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import {
  connectWallet,
  getAccounts,
  getBaseProvider,
} from '../Utils/etherManager'
import { setAccount, setConnected } from '../Features/walletSlice'

const WalletConnector = () => {
  const connected = useSelector((state: RootState) => state.wallet.connected)
  const dispatch = useDispatch()

  const onAccountChanged = useCallback(
    (accounts: string[]) => {
      dispatch(setAccount(accounts[0]))
    },
    [dispatch]
  )

  const connect = useCallback(async () => {
    if (!connected) {
      await connectWallet()
      const accounts = await getAccounts()
      if (accounts && accounts.length > 0) {
        dispatch(setConnected(true))
        dispatch(setAccount(accounts[0]))
        const provider = getBaseProvider()
        if (provider) {
          provider.on('accountsChanged', onAccountChanged)
        }
      }
    }
  }, [dispatch, connected, onAccountChanged])

  useEffect(() => {
    connect()
  }, [connect])
  return <></>
}

export default WalletConnector
