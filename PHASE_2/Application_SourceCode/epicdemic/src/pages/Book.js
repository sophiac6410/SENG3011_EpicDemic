import '../styles/Destination.css'
import FlightSearch from "../components/Book/FlightSearch"
import FlightTabs from "../components/Book/FlightTabs"
import '../styles/Book.css'
// import '../App.css'
import FlightFilter from "../components/Book/FlightFilter"
import * as React from 'react';
import { DarkButton } from "../styles/Button.js"
import NavbarComp from '../components/NavBar.js'
import { Typography } from '@mui/material'

function handleClick() {
  const flightSection = document.getElementById('flight-title');
  flightSection.scrollIntoView();
}

function Book() {
  return(
    <div className="mt-5" style={{margin: '0% 15%', width: 'auto'}}>
      <Typography variant="heading2">Book</Typography>
      <FlightSearch></FlightSearch>
      <DarkButton sx={{display: 'flex', marginX: 'auto', mb: 7, mt: 3}}>Find My Flight</DarkButton>
      {/* <button id='book-search' class='btn-base btn-dark btn-flight' onClick={handleClick}>Find My Flight</button> */}
      <hr size="3" width="100%" color="grey"></hr>
      <Typography variant="heading2" sx={{display: 'block', margin: '2% 0%'}}>Flights</Typography>
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