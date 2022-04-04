import * as React from 'react';
import "../../styles/Destination.css"
import "../../styles/Book.css"
import SliderTime from './SliderTime';
import SliderPrice from './SliderPrice';
import CheckboxAirline from './CheckboxAirline';
import planeLanding from '../../static/planeLanding.svg';
import planeTakeOff from '../../static/planeTakeOff.svg';


function FlightFilter() {
  return (
    <div style={{
      margin: '10px 20px',
      marginRight: '40px'
    }}>
      <div style={{
        margin: '30px 0px'
      }}>
        <h1 style={{
          fontSize: '14pt',
          margin: '15px 0px'
        }}>Time</h1>
        <h2 style={{
          fontSize: '12pt'
        }}><img src={planeTakeOff} width='18px' style={{
          marginRight: '10px'
        }}></img>Take Off</h2>
        <SliderTime></SliderTime>
        <div style={{
          margin: '30px 0px'
        }}></div>
        <h2 style={{
          fontSize: '12pt'
        }}><img src={planeLanding} width='18px' style={{
          marginRight: '10px'
        }}></img>Landing</h2>
        <SliderTime></SliderTime>
      </div>
      <div style={{
        margin: '50px 0px'
      }}>
        <h1 style={{
          fontSize: '14pt'
        }}>Airline</h1>
        <CheckboxAirline></CheckboxAirline>
      </div>
      <div style={{
        margin: '50px 0px'
      }}>
        <h1 style={{
          fontSize: '14pt'
        }}>Price Range</h1>
        <SliderPrice></SliderPrice>
      </div>
      <button class="btn-flight btn-filter">Filter</button>
    </div>
  )
}

export default FlightFilter