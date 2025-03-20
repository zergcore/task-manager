// src/theme.ts
import { createTheme } from '@mui/material/styles';

// Define your gradient for details (for example purposes)
const gradientAccent = 'linear-gradient(45deg, #FE6B8B, #FF8E53)';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // light blue for primary actions
    },
    secondary: {
      main: '#f48fb1', // pinkish tone
    },
    background: {
      default: '#121212', // dark background
      paper: '#1e1e1e',   // paper (card) background
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  components: {
    // Override MUI Card styles to include a gradient border or accent
    MuiCard: {
      styleOverrides: {
        root: {
          border: `2px solid transparent`,
          backgroundImage: gradientAccent,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          borderRadius: 8,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
      },
    },
  },
});

export default theme;
