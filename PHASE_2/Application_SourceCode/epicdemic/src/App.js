import React from 'react'
import NavbarComp from './components/Navbar'
import Footer from './components/Footer'
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
import Nunito from "./fonts/nunito/Nunito-Regular.ttf"
import "./styles/App.css"

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: ['Nunito', 'serif', 'Open Sans'].join(','),
    button: {
      textTransform: "none",
      fontFamily: 'Nunito, serif'
    },
    title: {
      fontFamily: "Nunito, serif",
      fontWeight: 700,
      fontSize: "2.1em",
      lineHeight: 1
    },
    heading1: {
      fontFamily: "Nunito, serif",
      fontWeight: 400,
      fontSize: "1.7em",
      lineHeight: 3,
    },
    heading2: {
      fontWeight: 700,
      fontSize: "1.4em",
      lineHeight: 1.6
    },
    heading3: {
      fontWeight: 700,
      fontSize: "1.1em",
      lineHeight: 1.5
    },
    bodyHeading: {
      fontFamily: "Open Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "1.1em",
      lineHeight: 2
    },
    bodyText: {
      fontFamily: "Open Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: '0.9em',
      lineHeight: 1.5,
    },
    bodyImportant: {
      fontFamily: "Open Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "1em",
      lineHeight: 1.8
    },
    caption: {
      fontFamily: "Nunito, sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: '0.8em',
      lineHeight: 1
    },
    bodySmall: {
      fontFamily: "Nunito, sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: '0.5em',
      lineHeight: "27px"
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Nunito';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Nunito'), local('Nunito-Regular'), url(${Nunito}) format('ttf');
        }
        `,
    },
  },
})

function App() {
    return(
      <ThemeProvider theme={theme}>
        {/* <NavbarComp></NavbarComp> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/destination/:code" element={<Destination></Destination>}>
              <Route index element={<Overview></Overview>}></Route>
              <Route path="travel" element={<Travel></Travel>}></Route>
              <Route path="covid" element={<Covid></Covid>}></Route>
              <Route path="book" element={<Book></Book>}></Route>
            </Route>
            <Route path="/finder" element={<DestinationFinder/>}/>
            <Route path="/saved" element={<SavedLocations/>}/>
          </Routes>
        </BrowserRouter>
        <Footer></Footer>
      </ThemeProvider>
    )
}

export default App
