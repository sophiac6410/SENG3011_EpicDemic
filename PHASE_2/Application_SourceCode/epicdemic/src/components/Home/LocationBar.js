import React from "react";
import LocationCard from "./LocationCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/Home.css"
import {Row, Col } from "react-bootstrap";
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import { DarkButton } from "../../styles/Button";

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

function LocationBar() {
  let navigate = useNavigate(); 

  return(
    <Row className="ms-1 me-1 pt-4 bg-light-teal">
      <Col className="mt-2" style={{ paddingLeft: '9%', paddingRight: '9%', marginBottom: '3%'}}>
        <div className="text-center">
          <Typography variant="heading1" className="color-white">YOUR SAVED LOCATIONS</Typography>
        </div>
        <div className="location-carousel">
          <Carousel 
            responsive={responsive} 
            // containerClass="location-carousel"
            autoPlay={false}
            arrows={true}
            shouldResetAutoplay={false}
            itemClass="location-card"
            centerMode={true}
            className="bg-light-teal"

          >
              <LocationCard></LocationCard>
              <LocationCard></LocationCard>
              <LocationCard></LocationCard>
              <LocationCard></LocationCard>
              <LocationCard></LocationCard>
              <LocationCard></LocationCard>
              <LocationCard></LocationCard>
          </Carousel>
        </div>
        <Row md={5} className="justify-content-center mt-5 mb-3">
          <DarkButton className="align-self-center"
            onClick={() => {
              navigate('/saved');
            }}>
              <Typography variant="bodyImportant">See all latest updates</Typography>
          </DarkButton>
        </Row>
      </Col>
    </Row>
  )
}

export default LocationBar