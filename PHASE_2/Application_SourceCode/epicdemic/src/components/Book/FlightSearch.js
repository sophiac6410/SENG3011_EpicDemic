import {InputGroup, FormControl, Row, Col, Image } from "react-bootstrap";
import {CitySelectPhilippines, CitySelectSydney} from "./CitySelect";
import "react-multi-carousel/lib/styles.css";
import planeLanding from '../../static/planeLanding.svg';
import planeTakeOff from '../../static/planeTakeOff.svg';
import '../../styles/Destination.css'
import '../../styles/Home.css'
import * as React from 'react';
import TextField from '@material-ui/core/TextField';

function FlightSearch() {
  return(
    <Row style={{display: 'flex'}}>
      <Col md={1} style={{width: 'auto'}}>
        <Image src={planeTakeOff} alt="" width="30px" height="30px" style={{margin: '20px'}}></Image>
      </Col>
      <Col md={2} className="bg-white search-container p-1 ps-2 pe-3" style={{flex: 1}}>
        <CitySelectSydney fieldLabel={"From"}></CitySelectSydney>
      </Col>
      <Col md={1} style={{width: 'auto'}}>
        <Image src={planeLanding} alt="" width="30px" height="30px" style={{margin: '20px'}}></Image>
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