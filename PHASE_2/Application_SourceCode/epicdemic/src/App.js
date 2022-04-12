
import NavbarComp from './components/Navbar'
import Home from './pages/home'
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
    fontFamily: ['Nunito', 'serif', 'open Sanc'].join(','),
    title: {
      fontFamily: "Nunito, serif",
      fontWeight: "700",
      fontSize: "48px",
      lineHeight: "55px"
    },
    heading1: {
      marginTop: "50px",
      marginBottom: "30px",
      fontFamily: "Nunito, serif",
      fontWeight: "700",
      fontSize: "31px",
      lineHeight: "55px",
      marginTop: "50px",
      marginBottom: "30px",
    },
    heading2: {
      fontWeight: "700",
      fontSize: "32px",
      lineHeight: "44px"
    },
    heading3: {
      fontWeight: "700",
      fontSize: "24px",
      lineHeight: "33px"
    },
    bodyHeading: {
      fontFamily: "Open Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "21px",
      lineHeight: "29px"
    },
    bodyText: {
      fontFamily: "Open Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "25px"
    },
    bodyImportant: {
      fontFamily: "Open Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "27px"
    },
    bodyCaption: {
      fontFamily: "Nunito, sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "20px",
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
            <Route path="/" element={<Home></Home>}>
            </Route>
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
