import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'IBM Plex Sans',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
