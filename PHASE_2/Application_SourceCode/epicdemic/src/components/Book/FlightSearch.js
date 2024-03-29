import {InputGroup, FormControl, Row, Col, Image } from "react-bootstrap";
import {CitySelectPhilippines, CitySelectSydney} from "./CitySelect";
import "react-multi-carousel/lib/styles.css";
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import '../../styles/Destination.css'
// import '../../styles/Home.css'
import * as React from 'react';
import TextField from '@material-ui/core/TextField';

function FlightSearch() {
  return(
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
        <CitySelectPhilippines fieldLabel={"Destination"}></CitySelectPhilippines>
      </Col>
      <Col md={1}></Col>
      <Col md={2} style={{flex: 1}}>
        <TextField
          id="departure-date"
          label="Departure Date"
          type="date"
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
          defaultValue="2022-04-06"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Col>
    </Row>
  )
}

export default FlightSearch