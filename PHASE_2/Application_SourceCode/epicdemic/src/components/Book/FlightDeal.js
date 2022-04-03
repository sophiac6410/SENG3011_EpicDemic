import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Col, Container, Row, Image} from "react-bootstrap"
import "../../styles/Destination.css"
import "../../styles/Book.css"
import qantas from "../../static/qantas.svg"

function FlightDeal() {
  return (
    <div class="flight-container text-center">
      <Image src={qantas} width='60px' height='70px' style={{
      margin: '10px'
      }}></Image>
      <div class="flight-flex" style={{
        display: 'flex'
      }}>
        <div class="flight-time-container">
          <div class="font-bold-large flight-time">10:20</div>
          <div class="font-small">Tue, 5 Apr</div>
        </div>
        <div class="font-bold-large flight-time">-</div>
        <div class="flight-time-container">
          <div class="font-bold-large flight-time">14:00</div>
          <div class="font-small">Wed, 6 Apr</div>
        </div>
      </div>
      <div class="flight-flex">
        <div class="font-meta-large">30 hrs</div>
        <div class="font-small">
          <span><img src={`https://flagcdn.com/w20/au.png`}></img></span>
          <span> Sydney </span>
          <span> - </span>
          <span><img src={`https://flagcdn.com/w20/ph.png`}></img></span>
          <span> Manila </span>
        </div>
      </div>
      <div class="flight-flex">
        <div class="font-meta-large">1 stop</div>
        <div class="font-small">8hrs in Singapore (DHO)</div>
      </div>
      {/* <Col>
        <Box>Best deal</Box>
      </Col> */}
      <div class="flight-flex">
        <div class="font-bold-large">AU$386</div>
        <button class="btn-flight-link">View Flight</button>
      </div>
    </div>
  )
}

export default FlightDeal