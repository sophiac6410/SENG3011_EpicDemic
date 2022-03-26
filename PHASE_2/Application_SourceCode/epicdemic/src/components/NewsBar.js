import React from "react";
import NewsCard from "./NewsCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/Home.css"
import { Row } from "react-bootstrap";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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

class NewsBar extends React.Component {
  render() {
    return(
      <Row className="mt-2">
        <div className="sub-title mb-2">GLOBAL NEWS</div>
        <div className="news-carousel">
          <Carousel 
            responsive={responsive} 
            containerClass="news-carousel"
            autoPlay={false}
            arrows={false}
            shouldResetAutoplay={false}
            itemClass="news-card"
            centerMode={true}
            className="news-carousel"
          >
            <div className="news-container">
              <NewsCard></NewsCard>
              <div className="news-container-col">
                <NewsCard></NewsCard>
                <NewsCard></NewsCard>
              </div>
            </div>
            <div className="news-container">
              <NewsCard></NewsCard>
              <div className="news-container-col">
                <NewsCard></NewsCard>
                <NewsCard></NewsCard>
              </div>
            </div>
          </Carousel>
        </div>
      </Row>
    )
  }
}

export default NewsBar