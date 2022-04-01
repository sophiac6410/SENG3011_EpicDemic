import React from "react";
import NewsCard from "./NewsCard";
// import { Carousel } from 'react-responsive-carousel';
import "../styles/Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { Row } from "react-bootstrap";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Carousel from "react-multi-carousel";
import NewsCardSmall from "./NewsCardSmall"
import globe from '../static/globe.svg'

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

const colours = [ '#7EB2FF', '#ADD8E6', '#0F83A0' ]

class NewsBar extends React.Component {
  render() {
    return(
      <div style={{ padding: '30px', marginBottom: '30px' }}>
        <Row className="mt-2">
          <div className="sub-title mb-2" style={{ color: '#045d5d' }}>
            <img className="me-3 ms-3" src={globe} width="35px" height="35px" alt="global page"></img>
            GLOBAL NEWS
          </div>
          <div className="news-carousel">
            <Carousel 
              swipeable={true}
              showStatus={false}
              responsive={responsive} 
            >
              <NewsCard col={colours[0]}></NewsCard>
              <NewsCardSmall col1={colours[1]} col2={colours[2]}></NewsCardSmall>
              <NewsCard col={colours[0]}></NewsCard>
              <NewsCardSmall col1={colours[1]} col2={colours[2]}></NewsCardSmall>
              {/* <div className="news-container">
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
              </div> */}
            </Carousel>
          </div>
        </Row>
      </div>

    )
  }
}

export default NewsBar