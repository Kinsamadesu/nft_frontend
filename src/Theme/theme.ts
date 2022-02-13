import { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
    },
  })
