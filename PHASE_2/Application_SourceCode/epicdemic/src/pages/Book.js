import '../styles/Destination.css'
import FlightSearch from "../components/Book/FlightSearch"
import FlightTabs from "../components/Book/FlightTabs"
import '../styles/Book.css'
// import '../App.css'
import FlightFilter from "../components/Book/FlightFilter"
import { DarkButton } from "../styles/Button.js"
import NavbarComp from '../components/NavBar.js'
import { Typography } from '@mui/material'
import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom"
import { getFligtData } from '../adapters/flightAPI'

function handleClick() {
  const flightSection = document.getElementById('flight-title');
  flightSection.scrollIntoView();
}

function Book() {
  const { code } = useParams();
  const [sourcedata, setSourceData] = useState([]);
  const [search, setSearch] = useState({
    originCode: "SYD", 
    destinationCode: "BKK", 
    dateOfDeparture: "2022-05-01", 
    adults: 1
  });
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if(code == null) return

    const {out, controller} = getFligtData(search)

    out.then(res => {
      // If we send too many request to the api per second - we will get an error and app will break
      // Therefore we implemented simple check to prevent error on client side.
      console.log(res)
      setData(res); // dispatching data to components state
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    });
    // controller.abort()
  }, [code, search])

  if(sourcedata == []) {
    return <div/>
  }
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