import React from "react";
import LocationCard from "./LocationCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/Home.css"
import { Row } from "react-bootstrap";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
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

class LocationBar extends React.Component {
  render() {
    return(
      <Row className="mt-2">
        <div className="sub-title mb-2">YOUR SAVED LOCATIONS</div>
        <div className="location-carousel">
          <Carousel 
            responsive={responsive} 
            containerClass="location-carousel"
            autoPlay={false}
            arrows={false}
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
          </Carousel>
        </div>
      </Row>
    )
  }
}

export default LocationBar