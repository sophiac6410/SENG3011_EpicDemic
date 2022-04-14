import * as React from 'react';
import { Col, Container, Row, Image} from "react-bootstrap"
import "../../styles/Destination.css"
import "../../styles/Book.css"
import qantas from "../../static/qantas.svg"
import { Typography } from '@mui/material';

function FlightDeal() {
  return (
    <div class="border-radius-small bg-white flight-container text-center" style={{boxShadow: '3px 3px 3px 3px #cccccc'}}>
      <Image src={qantas} width='40px' height='50px' style={{
      margin: '10px'
      }}></Image>
      <div class="flight-flex" style={{
        display: 'flex'
      }}>
        <div class="flight-time-container">
          <Typography variant="heading3">10:20</Typography>
          <Typography variant="caption">Tue, 5 Apr</Typography>
        </div>
        <Typography variant="heading3">-</Typography>
        <div class="flight-time-container">
          <Typography variant="heading3">14:00</Typography>
          <Typography variant="caption">Wed, 6 Apr</Typography>
        </div>
      </div>
      <div class="flight-flex">
        <Typography variant="bodyText" sx={{textAlign: 'center'}}>30 hrs</Typography>
        <div>
          {/* <span><img src={`https://flagcdn.com/w20/au.png`}></img></span> */}
          <Typography variant="caption" sx={{display: 'inline'}}> Sydney </Typography>
          <Typography variant="caption" sx={{display: 'inline'}}> - </Typography>
          {/* <span><img src={`https://flagcdn.com/w20/ph.png`}></img></span> */}
          <Typography variant="caption" sx={{display: 'inline'}}> Manila </Typography>
        </div>
      </div>
      <div class="flight-flex">
        <Typography variant="bodyText" sx={{textAlign: 'center'}}>1 stop</Typography>
        <Typography variant="caption" sx={{display: 'inline'}}>8hrs in Singapore (DHO)</Typography>
      </div>
      {/* <Col>
        <Box>Best deal</Box>
      </Col> */}
      <div class="flight-flex">
        <Typography variant="heading3">AU$386</Typography>
        <button class="btn-base btn-light btn-flight-link">View Flight</button>
      </div>
    </div>
  )
}

export default FlightDeal