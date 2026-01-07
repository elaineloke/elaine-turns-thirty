import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Roboto", sans-serif',
    },
    h4: {
      fontFamily: '"Roboto", sans-serif',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
    },
    h6: {
      fontFamily: '"Roboto", sans-serif',
    },
    body1: {
      fontFamily: '"Roboto", sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#ec407a',
      light: '#f8bbd9',
      dark: '#d81b60',
    },
    secondary: {
      main: '#ad1457',
    },
    background: {
      default: '#fff5f7',
    },
  },
});
