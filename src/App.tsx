import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { getTheme } from './Theme/theme'
import MyList from './Pages/MyList'
import Home from './Pages/Home'
import Error from './Pages/Error'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import WalletConnector from './Components/WalletConnector'

function App() {
  const themeMode = useSelector((state: RootState) => state.settings.mode)
  const [theme, setTheme] = useState(getTheme(themeMode))

  useEffect(() => {
    setTheme(getTheme(themeMode))
  }, [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <WalletConnector></WalletConnector>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/list" element={<MyList />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  )
}

export default App
