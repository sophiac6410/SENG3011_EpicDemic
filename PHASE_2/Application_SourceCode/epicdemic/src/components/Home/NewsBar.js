import React from "react";
import NewsCard from "./NewsCard";
// import { Carousel } from 'react-responsive-carousel';
import "../../styles/Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import LanguageIcon from '@mui/icons-material/Language';
import Typography from '@mui/material/Typography'


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

const colours = [ '#0F83A0', 'white', '#70C4E8' ]
const fontColours = [ 'white', '#0F83A0', 'white' ]


class NewsBar extends React.Component {
  render() {
    return(
      <div style={{ padding: '5% 9%', marginBottom: '4%' }}>
        <Row className="mt-2 justify-content-center">
          <div className="mb-3 text-center me-5" style={{ color: '#515151' }}>
            <LanguageIcon fontSize="large" className="color-medium-blue"  sx={{marginBottom: '1%', marginRight: '0.5%'}}/>
            <Typography variant="heading1" className="color-dark-teal" style={{display: 'inline'}}>GLOBAL NEWS</Typography>
          </div>
          <div className="news-carousel bg-off-white">
            <Carousel 
              swipeable={true}
              showStatus={false}
              responsive={responsive}
              className="bg-off-white"
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