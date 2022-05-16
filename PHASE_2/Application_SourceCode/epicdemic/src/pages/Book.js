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
import { getDestination, getIATA } from '../apiCalls'
import { CitySelectPhilippines, CitySelectSydney } from '../components/Book/CitySelect'
import { Row, Col } from 'react-bootstrap'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { TextField } from '@mui/material'
import { TailSpin } from  'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function handleClick() {
  const flightSection = document.getElementById('flight-title');
  flightSection.scrollIntoView();
}

function Book() {
  const { code } = useParams();
  const [departData, setDepartData] = useState([]);
  const [returnData, setReturnData] = useState([]);

  const [search, setSearch] = useState(null);

  const [searchDe, setSearchDe] = useState({
    originCode: "SYD", 
    dateOfDeparture: "2022-05-01",
    adults: 1
  });

  const [searchRe, setSearchRe] = useState({
    destinationCode: "SYD", 
    dateOfDeparture: "2022-05-05",
    adults: 1
  });

  // setSearch({destinationCode: dest})

  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if(code == null) return

    async function getSearchData() {
      const data = await getDestination(code);
      const destination = await getIATA(data.latitude, data.longitude);

      setSearch({
        originCode: "SYD",
        destinationCode: destination, 
        dateOfDeparture: "2022-05-01",
        dateOfReturn: "2022-05-05",
        adults: 1
      })
    }
    getSearchData()
    return () => {
      setSearch(null)
      setDepartData([])
      setReturnData([])
    }
  }, [code])


  useEffect(() => {
    async function updateSearch() {
      // setSearch({destinationCode: dest})
      setSearchDe({
        originCode: search.originCode,
        destinationCode: search.destinationCode, 
        dateOfDeparture: search.dateOfDeparture,
        adults: 1
      })
      // setSearch({destinationCode: dest})
      setSearchRe({
        originCode: search.destinationCode,
        destinationCode: search.originCode, 
        dateOfDeparture: search.dateOfReturn,
        adults: 1
      })
    }
    updateSearch()
  }, [search])


  const searchFlight = async() => {
    setLoading(true)
    var {out, controller} = getFligtData(searchDe)
    out.then(res => {
      if(res.status == 200){
        setDepartData(res.data); // dispatching data to components state
      }
      setLoading(false)
      console.log(res)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    });
    var {out, controller} = getFligtData(searchRe)
    out.then(res => {
      console.log(res)
      if(res.status == 200){
        setReturnData(res.data); // dispatching data to components state
      }
      console.log(res.data.response)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    });
  }

  const handleDate = ((prop) => (event) => {
    setSearch({...search, [prop]: event.target.value})
  })

  const handleCity = ((value) => {
    console.log(value)
    setSearch({...search, ["destinationCode"]: value})
  })

  if(search == null) {
    return <div/>
  }
  return(
    <div className="mt-5" style={{margin: '0% 15%', width: 'auto'}}>
      <Typography variant="heading2">Book</Typography>
      <Row style={{display: 'flex'}}>
        <Col md={1} style={{width: 'auto'}}>
          <FlightTakeoffIcon className="color-dark-teal mt-3" fontSize="large"/>
        </Col>
        <Col md={2} className="bg-white search-container p-1 ps-2 pe-3" style={{flex: 1}}>
          <CitySelectSydney fieldLabel={"From"}></CitySelectSydney>
        </Col>
        <Col md={1} style={{width: 'auto'}}>
          <FlightLandIcon className="color-dark-teal mt-3" fontSize="large" />
        </Col>
        <Col md={2} className="bg-white search-container p-1 ps-2 pe-3" style={{flex: 1}}>
          <CitySelectPhilippines fieldLabel={"Destination"} city={search.destinationCode} handleCity={handleCity}></CitySelectPhilippines>
        </Col>
        <Col md={1}></Col>
        <Col md={2} style={{flex: 1}}>
          <TextField
            id="departure-date"
            label="Departure Date"
            type="date"
            value={search.dateOfDeparture}
            onChange={handleDate('dateOfDeparture')}
            defaultValue="2022-04-05"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Col>
        <Col md={2} style={{flex: 1}}>
          <TextField
            id="return-date"
            label="Return Date"
            type="date"
            value={search.dateOfReturn}
            onChange={handleDate('dateOfReturn')}
            defaultValue="2022-04-06"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Col>
      </Row>
      <DarkButton onClick={searchFlight} sx={{display: 'flex', marginX: 'auto', mb: 7, mt: 3}}>Find My Flight</DarkButton>
      {/* <button id='book-search' class='btn-base btn-dark btn-flight' onClick={handleClick}>Find My Flight</button> */}
      <hr size="3" width="100%" color="grey"></hr>
      <Typography variant="heading2" sx={{display: 'block', margin: '2% 0%'}}>Flights</Typography>
      <div className='d-flex flex-row'>
        <FlightFilter className="col-3"></FlightFilter>
        {/* <div style={{display: loading ? "block" : "none"}}>
          <TailSpin color="#70C4E8" height={80} width={80} />
        </div> */}
        <FlightTabs className="ms-5" loading={loading} Deflights={departData} Reflights={returnData} depart={search.originCode} dest={search.destinationCode}></FlightTabs>
      </div>
    </div>
  )
}

export default Book