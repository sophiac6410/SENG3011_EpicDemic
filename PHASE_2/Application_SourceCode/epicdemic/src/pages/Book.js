import midDot from "../static/mid-dot.svg"
import '../styles/Destination.css'
import FlightSearch from "../components/Book/FlightSearch"
import FlightTabs from "../components/Book/FlightTabs"
import '../styles/Book.css'
import FlightFilter from "../components/Book/FlightFilter"

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';

function handleClick() {
  const flightSection = document.getElementById('flight-title');
  flightSection.scrollIntoView();
}

function Book() {
  return(
    <div>
      <h1 class="title-h3">Book</h1>
      <FlightSearch></FlightSearch>
      <button id='book-search' class='btn-flight' onClick={handleClick}>Find My Flight</button>
      <hr size="3" width="100%" color="grey"></hr>
      <h1 id="flight-title" class='title-h4'>Flights</h1>
      <div style={{
        display: 'flex',
      }}>
        <FlightFilter></FlightFilter>
        <FlightTabs></FlightTabs>
      </div>
    </div>
  )
}

export default Book