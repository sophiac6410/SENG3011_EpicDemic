import React from "react";
import LocationCard from "./LocationCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/Home.css"
import {Row, Col } from "react-bootstrap";
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import { DarkButton } from "../../styles/Button";
import { Context, useContext } from '../../context';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const StyledCarousel= styled(Carousel)(({ theme }) => ({
    // alignItems: 'flex-start',
    padding: 10,
  }));
  

function getBar (loggedIn, locations) {
  let navigate = useNavigate();
  if (loggedIn) {
    if (locations.length === 0) {
      return (
        <>
        <div className="text-center">
          <Typography variant="heading3" className="color-dark-grey">You have no saved locations</Typography>
          <Typography variant="heading3" className="color-dark-grey">Save locations to receive important updates on travel!</Typography>
        </div>
        <Row md={5} className="justify-content-center mt-5 mb-3">
          <DarkButton className="align-self-center"
            onClick={() => {
              navigate('/finder');
            }}>
            <Typography variant="bodyImportant" onClick={()=>{navigate('/finder')}}>Find a Destination</Typography>
          </DarkButton>
        </Row>
        </>
      )
    } else {
      return (
        <>
        <div className="location-carousel" style={{padding: '10px'}}>
          <StyledCarousel 
            responsive={responsive} 
            // containerClass="location-carousel"
            autoPlay={false}
            arrows={true}
            shouldResetAutoplay={false}
            itemClass="location-card"
            sx={{padding: '10px'}}
            centerMode={true}
          >
            {locations !== undefined
              ? locations.map((loc, index) => {
                  return <LocationCard key={index} id={loc}/>
                })
              : <></>
            }
          </StyledCarousel>
        </div>
        <Row md={5} className="justify-content-center mt-5 mb-3">
          <DarkButton className="align-self-center"
            onClick={() => {
              navigate('/finder');
            }}>
            <Typography variant="bodyImportant" onClick={()=>{navigate('/finder')}}>Find a Destination</Typography>
          </DarkButton>
        </Row>
        </>
      )
    }
  } else {
    return (
      <div className="text-center">
      <Typography variant="heading3" className="color-dark-grey m-5">Login in to save locations and receive important updates on travel!</Typography>
      </div>
    )
  }
}

function LocationBar(props) {
  LocationBar.propTypes = { locations: PropTypes.array }
  console.log(props.locations);
  let navigate = useNavigate(); 
  const { getters } = useContext(Context);
  const Bar = getBar(getters.loggedIn, props.locations);
  return(
    <Row className="ms-1 me-1 pt-4">
      <Col className="mt-2" style={{ paddingLeft: '9%', paddingRight: '9%', marginBottom: '3%'}}>
        {Bar}
      </Col>
    </Row>
  )
}

export default LocationBar