import { PaletteMode } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  mode: PaletteMode
}

const initialState: SettingsState = {
  mode: 'dark',
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload
    },
    switchMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMode, switchMode } = settingsSlice.actions

export default settingsSlice.reducer
