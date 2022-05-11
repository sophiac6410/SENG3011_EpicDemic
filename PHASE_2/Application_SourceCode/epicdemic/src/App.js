import React from 'react'
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
import { Context, initialValue } from './context';

import {
    Routes,
    Route,
    BrowserRouter
  } from "react-router-dom";
import Planner from './pages/Planner'
import Trip from './pages/Trip'

const theme = createTheme({
  palette: {
    teal: {
      main: '#0F83A0',
    },
    darkTeal: {
      main: '#1B4965'
    },
  },
  // components: {
  //   MuiDesktopDatePicker: {
  //     styleOverrides:{
  //       root: {
  //         color: "#0F83A0",
  //         svg: {
  //           color: "#0F83A0",
  //         }
  //       }
  //     }
  //   }
  // },
  typography: {
    fontFamily: ['Nunito', 'serif', 'Open Sans'].join(','),
    superTitle: {
      fontFamily: "Nunito, serif",
      fontWeight: 700,
      fontWeight: "bold",
      fontSize: "4.5em",
      lineHeight: 1.5,
      display: 'inline',
    },
    title: {
      fontFamily: "Nunito, serif",
      fontWeight: 700,
      fontSize: "2em",
      lineHeight: 1,
      display: 'block',
    },
    heading1: {
      fontFamily: "Nunito, serif",
      fontWeight: 400,
      fontSize: "1.7em",
      lineHeight: 3,
      display: 'block',
    },
    heading2: {
      fontWeight: 700,
      fontSize: "1.2em",
      lineHeight: 1.6,
      display: 'block',
    },
    heading3: {
      fontWeight: 700,
      fontSize: "1.1em",
      lineHeight: 1.5,
      display: 'block',
    },
    bodyHeading: {
      fontFamily: "Open Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "1em",
      lineHeight: 2,
      display: 'block',
    },
    bodyText: {
      fontFamily: "Open Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: '0.8em',
      lineHeight: 1.5,
      display: 'block',
      // textAlign: 'start'
    },
    bodyImportant: {
      fontFamily: "Open Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "0.9em",
      lineHeight: 1.8,
      display: 'block',
    },
    caption: {
      fontFamily: "Nunito, sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: '0.8em',
      lineHeight: 1.5,
      display: 'block',
    },
    bodySmall: {
      fontFamily: "Nunito, sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: '0.5em',
      lineHeight: "27px",
      display: 'block',
    },
    button: {
      textTransform: "none",
      fontFamily: 'Nunito, serif',
      variant: 'bodyImportant'
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
    const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('token') !== null);
    const getters = {
      loggedIn,
    };
    const setters = {
      setLoggedIn,
    }
    return(
      <ThemeProvider theme={theme}>
        <Context.Provider value={{ getters, setters, }}>
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
              <Route path="/planner" element={<Planner/>}/>
              <Route path="/trip/:tripId" element={<Trip></Trip>}/>
            </Routes>
          </BrowserRouter>
          <Footer></Footer>
        </Context.Provider>
      </ThemeProvider>
    )
}

export default App
