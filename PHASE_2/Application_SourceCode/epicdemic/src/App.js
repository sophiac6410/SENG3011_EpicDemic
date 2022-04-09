import React from 'react'
import NavbarComp from './components/Navbar'
import Home from './pages/home'
import Register from './pages/Register'
import Login from './pages/Login'
import Overview from './pages/Overview'
import Travel from './pages/Travel'
import Destination from './pages/Destination'
import Covid from './pages/Covid'
import Book from './pages/Book'
import DestinationFinder from './pages/DestinationFinder';
import SavedLocations from './pages/SavedLocations';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './styles/index.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";

// import Nunito from './fonts/nunito/Nunito-Regular.ttf';
// import { StylesProvider } from '@material-ui/core'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Nunito',
    ].join(','),
  },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides:`
  //       @font-face {
  //         font-family: 'Nunito, serif';
  //         src: local('Nunito'), url(${Nunito}) format('truetype');
  //       }
  //     `,
  //   },
  // },
});

function App() {
  const [auth, setAuth] = React.useState(false);
  return(
    <ThemeProvider theme={theme}>
        <NavbarComp auth={auth}></NavbarComp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/destination/:country" element={<Destination></Destination>}>
              <Route index element={<Overview></Overview>}></Route>
              <Route path="travel" element={<Travel></Travel>}></Route>
              <Route path="covid" element={<Covid></Covid>}></Route>
              <Route path="book" element={<Book></Book>}></Route>
            </Route>
            <Route path="/finder" element={<DestinationFinder/>}/>
            <Route path="/saved" element={<SavedLocations/>}/>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
