import * as React from 'react';
import "../../styles/Destination.css"
import "../../styles/Book.css"
import SliderTime from './SliderTime';
import SliderPrice from './SliderPrice';
import CheckboxAirline from './CheckboxAirline';
import { LightButton } from "../../styles/Button";
import { Typography } from '@mui/material';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

function FlightFilter() {
  return (
    <div style={{
      marginRight: '3%',
      marginBottom: '5%'
    }}>
      <div style={{
        margin: '3% 0px'
      }}>
        <Typography variant="bodyText">Time</Typography>
        <FlightTakeoffIcon className="color-dark-teal m-2" fontSize="small" sx={{display:'inline'}}/>
        <Typography variant="bodyText" sx={{display:'inline'}}>Take Off</Typography>
        <SliderTime></SliderTime>
        <div style={{
          margin: '30px 0px'
        }}></div>
        <FlightLandIcon className="color-dark-teal m-2" fontSize="small" sx={{display:'inline'}}/>
        <Typography variant="bodyText" sx={{display:'inline'}}>Landing</Typography>
        <SliderTime></SliderTime>
      </div>
      <div style={{
        margin: '50px 0px'
      }}>
        <Typography variant="bodyText">Airline</Typography>
        <CheckboxAirline></CheckboxAirline>
      </div>
      <div style={{
        margin: '50px 0px'
      }}>
        <Typography variant="bodyText">Price Range</Typography>
        <SliderPrice></SliderPrice>
      </div>
      <LightButton sx={{marginLeft: '30%'}}>Filter</LightButton>
    </div>
  )
}

export default FlightFilter