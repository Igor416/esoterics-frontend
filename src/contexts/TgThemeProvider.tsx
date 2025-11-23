import { useEffect, useMemo } from 'react';
import { ThemeProvider } from "@mui/material";
import { useExpand, useWebApp, useThemeParams } from '@vkruglikov/react-telegram-web-app';
import { lightTheme, darkTheme } from './themes';

interface TgThemeProviderProps {
  children: React.ReactNode | React.ReactNode[]
}

export function TgThemeProvider({children}: TgThemeProviderProps) {
  const [isExpanded, expand] = useExpand()
  const webapp = useWebApp()
  const [colorScheme] = useThemeParams()
  //const colorScheme: 'light' | 'dark' = 'dark'

  const theme = useMemo(() => colorScheme === 'light' ? lightTheme : darkTheme, [colorScheme])
  
  useEffect(() => {
    if (!isExpanded) {
      expand()
    }
  }, [expand, isExpanded])

  useEffect(() => {
    webapp.isVerticalSwipesEnabled = false
    webapp.disableVerticalSwipes()
    webapp.setHeaderColor(theme.palette.background.default)
    webapp.setBackgroundColor(theme.palette.background.default)
  }, [theme, webapp])

  useEffect(() => {
    if (colorScheme) {
      document.getElementsByTagName('html')[0].setAttribute('data-bs-theme-mode', colorScheme)
    }
  }, [colorScheme])

  return <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
}