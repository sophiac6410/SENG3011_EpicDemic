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
import DiseaseCard from "./DiseaseCard";

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

const COLOR = 'white'

export default function DiseaseReportBar() {
    return(
      <div style={{ padding: '30px', marginBottom: '30px', backgroundColor: '#E9F0FB' }}>
        <Row className="mt-2" style={{ backgroundColor: '#E9F0FB' }}>
          <div className="sub-title mb-2" style={{ color: '#045d5d' }}>
            DISEASE REPORTS
          </div>
          <div className="news-carousel" style={{ backgroundColor: '#E9F0FB' }}>
            <Carousel 
              swipeable={true}
              showStatus={false}
              responsive={responsive} 
            >
              <div className="news-container-col">
                <DiseaseCard></DiseaseCard>
                <DiseaseCard></DiseaseCard>
              </div>
              <div className="news-container-col">
                <DiseaseCard></DiseaseCard>
                <DiseaseCard></DiseaseCard>
              </div>
              <div className="news-container-col">
                <DiseaseCard></DiseaseCard>
                <DiseaseCard></DiseaseCard>
              </div>
              <div className="news-container-col">
                <DiseaseCard></DiseaseCard>
                <DiseaseCard></DiseaseCard>
              </div>
            </Carousel>
          </div>
        </Row>
      </div>

    )
}

