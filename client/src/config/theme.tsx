import { grey, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[700],
    },
    secondary: {
      main: grey[200],
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: red[700],
    },
    secondary: {
      main: grey[700],
    },
  },
});