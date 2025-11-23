import { createTheme } from "@mui/material"

const theme =  createTheme({
  colorSchemes: {
    dark: true,
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
})

export const lightTheme = createTheme({
  ...theme,
  palette: {
    mode: 'light',
    primary: {
      light: '#6db4f2',
      main: '#3c95ed',
      dark: '#3275cc',
      contrastText: '#17202b',
    },
    secondary: {
      light: '#f4ac4d',
      main: '#ed953c',
      dark: '#de7934',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f2eeff',
      paper: '#f2eeff',
    }
  }
})

export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    primary: {
      light: '#6db4f2',
      main: '#3c95ed',
      dark: '#3275cc',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#f4ac4d',
      main: '#ed953c',
      dark: '#de7934',
      contrastText: '#17202b',
    },
    background: {
      default: '#17202b',
      paper: '#17202b',
    },
  }
})