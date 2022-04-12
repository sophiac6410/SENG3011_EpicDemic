import React from "react";
import LocationCard from "./LocationCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/Home.css"
import {Row, Col } from "react-bootstrap";
import Typography from '@mui/material/Typography'

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
    <Row className="ms-1 me-1 pt-5">
      <Col className="mt-2 bg-darkteal" style={{padding: '20px 50px'}}>
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
        <Row md={5} className="justify-content-center m-3">
          <button className="btn-base btn-dark align-self-center"
            onClick={() => {
              navigate('/saved');
            }}>See all latest updates</button>
        </Row>
      </Col>
    </Row>
  )
}

export default LocationBar