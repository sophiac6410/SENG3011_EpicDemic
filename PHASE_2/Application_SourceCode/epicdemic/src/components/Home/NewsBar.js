import React from "react";
import NewsCard from "./NewsCard";
// import { Carousel } from 'react-responsive-carousel';
import "../../styles/Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { Row } from "react-bootstrap";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Carousel from "react-multi-carousel";
import NewsCardSmall from "./NewsCardSmall"
import globe from '../../static/globe.svg'

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2000 },
      items: 3
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

const colours = [ '#0F83A0', '#E2F2FC', '#70C4E8' ]
const fontColours = [ 'white', '#0F83A0', 'white' ]


class NewsBar extends React.Component {
  render() {
    return(
      <div style={{ padding: '30px', marginBottom: '30px' }}>
        <Row className="mt-2">
          <div className="sub-title mb-2 text-center" style={{ color: '#515151' }}>
            <img className="me-3 ms-3" src={globe} width="30px" height="30px" alt="global page"></img>
            GLOBAL NEWS
          </div>
          <div className="news-carousel">
            <Carousel 
              swipeable={true}
              showStatus={false}
              responsive={responsive} 
            >
              <NewsCard col={colours[0]} fontC={fontColours[0]}></NewsCard>
              <div className="news-container-col">
                <NewsCard col={colours[1]} fontC={fontColours[1]}></NewsCard>
                <NewsCard col={colours[2]} fontC={fontColours[2]}></NewsCard>
              </div>
              <NewsCard col={colours[0]} fontC={fontColours[0]}></NewsCard>
              <div className="news-container-col">
                <NewsCard col={colours[1]} fontC={fontColours[1]}></NewsCard>
                <NewsCard col={colours[2]} fontC={fontColours[2]}></NewsCard>
              </div>
            </Carousel>
          </div>
        </Row>
      </div>

    )
  }
}

export default NewsBar