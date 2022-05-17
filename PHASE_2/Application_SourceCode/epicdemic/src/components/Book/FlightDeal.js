import * as React from 'react';
import { Col, Container, Row, Image} from "react-bootstrap"
import "../../styles/Destination.css"
import "../../styles/Book.css"
import qantas from "../../static/qantas.svg"
import { Typography } from '@mui/material';
import { LightButton } from '../../styles/Button';

function FlightDeal({data, depart, dest}) {
  return (
    <div class="border-radius-small bg-white d-flex flex-row justify-content-start align-items-center mt-3 mb-3 pt-2 pb-2 shadow" >
      <div className='col-1'>
        <Image src={qantas} width='40px' height='50px' style={{margin: '10px'}}></Image>
      </div>
      <div class="col-4" style={{display: 'flex'}}>
        <div class="flight-time-container">
          <Typography variant="heading3">{data.itineraries[0].segments[0].departure.at.slice(11,16)}</Typography>
          <Typography variant="caption">{data.itineraries[0].segments[0].departure.at.slice(0,10)}</Typography>
        </div>
        <Typography variant="heading3">-</Typography>
        <div class="flight-time-container">
          <Typography variant="heading3">{data.itineraries[0].segments[data.itineraries[0].segments.length - 1].arrival.at.slice(11,16)}</Typography>
          <Typography variant="caption">{data.itineraries[0].segments[data.itineraries[0].segments.length - 1].arrival.at.slice(0,10)}</Typography>
        </div>
      </div>
      <div class="col-2">
        {/* <Typography variant="bodyText" sx={{textAlign: 'center'}}>30 hrs</Typography> */}
        <div>
          <span><img src={`https://flagcdn.com/w20/au.png`}></img></span>
          <Typography variant="caption" sx={{display: 'inline'}}> {depart} </Typography>
          <Typography variant="caption" sx={{display: 'inline'}}> - </Typography>
          {/* <span><img src={`https://flagcdn.com/w20/ph.png`}></img></span> */}
          <Typography variant="caption" sx={{display: 'inline'}}> {dest} </Typography>
        </div>
      </div>
      <div className="col-3">
        {data.itineraries[0].segments.length > 1 ? (
          <div className='d-flex flex-column justify-content-center'>
            <Typography variant="bodyText" sx={{textAlign: 'center'}}>{data.itineraries[0].segments.length - 1} stop</Typography>
            <Typography variant="caption" sx={{textAlign: 'center'}}>in {data.itineraries[0].segments[0].arrival.iataCode}</Typography>
          </div>
        ): (
          <Typography variant="bodyText" sx={{textAlign: 'center'}}>No stop</Typography>
          )}
      </div>
      {/* <Col>
        <Box>Best deal</Box>
      </Col> */}
      <div class="col-2">
        <Typography variant="heading3">{data.price.currency}{data.price.total}</Typography>
        <LightButton sx={{padding: '3% 7%'}}>View Flight</LightButton>
      </div>
    </div>
  )
}

export default FlightDeal