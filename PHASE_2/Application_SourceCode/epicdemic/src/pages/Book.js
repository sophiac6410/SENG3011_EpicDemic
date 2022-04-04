import '../styles/Destination.css'
import FlightSearch from "../components/Book/FlightSearch"
import FlightTabs from "../components/Book/FlightTabs"
import '../styles/Book.css'
import FlightFilter from "../components/Book/FlightFilter"
import * as React from 'react';

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