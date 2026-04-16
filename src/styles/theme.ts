import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ad8f7d',
    },
    background: {
      default: '#D9D9D9',
      paper: '#000000',
    },
    common: {
      white: '#fff',
      black: '#000',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
    grey: {
      100: '#f0f0f0',
      200: '#ccc',
      300: '#aaa',
      400: '#b0b0b0',
    },
  },

  typography: {
    fontFamily: 'Roboto, sans-serif',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'lowercase',
          borderRadius: 4,
        },
        outlined: {
          backgroundColor: '#fff',
          color: '#000',
          border: '1px solid #ccc',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          borderRadius: 8,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
})
