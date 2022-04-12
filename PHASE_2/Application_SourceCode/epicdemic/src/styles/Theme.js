import React from 'react';
import Nunito from '../fonts/nunito/Nunito-Regular.ttf';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides:`
        @font-face {
          font-family: 'Nunito';
          src: local('Nunito'), local('Nunito-Regular), url(${Nunito}) format('truetype');
        }
      `,
    },
  },
});

// return (
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <Box
//       sx={{
//         fontFamily: 'Nunito',
//       }}
//     >
//       Raleway
//     </Box>
//   </ThemeProvider>
// );