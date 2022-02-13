import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface WalletState {
  connected: boolean
  account: string
}

const initialState: WalletState = {
  connected: false,
  account: '',
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload
    },
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setConnected, setAccount } = walletSlice.actions

export default walletSlice.reducer
