import '../styles/Destination.css'
import FlightSearch from "../components/Book/FlightSearch"
import FlightTabs from "../components/Book/FlightTabs"
import '../styles/Book.css'
import '../styles/App.css'
import FlightFilter from "../components/Book/FlightFilter"
import * as React from 'react';
import { DarkButton } from "../styles/Global.js"

function handleClick() {
  const flightSection = document.getElementById('flight-title');
  flightSection.scrollIntoView();
}

function Book() {
  return(
    <div>
      <h1 class="title-h2">Book</h1>
      <FlightSearch></FlightSearch>
      <DarkButton sx={{justifyContent: 'center'}}>Find My Flight</DarkButton>
      {/* <button id='book-search' class='btn-base btn-dark btn-flight' onClick={handleClick}>Find My Flight</button> */}
      <hr size="3" width="100%" color="grey"></hr>
      <h1 id="flight-title" class='title-h3'>Flights</h1>
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