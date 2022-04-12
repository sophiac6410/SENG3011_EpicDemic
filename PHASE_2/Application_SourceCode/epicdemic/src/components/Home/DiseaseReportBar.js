import React from "react";
import NewsCard from "./NewsCard";
// import { Carousel } from 'react-responsive-carousel';
// import "../../styles/Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { Row } from "react-bootstrap";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Carousel from "react-multi-carousel";
import DiseaseCard from "./DiseaseCard";
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

const COLOR = 'white';

export default function DiseaseReportBar(parent) {
    return(
      <div style={{ padding: '30px', marginBottom: '30px', backgroundColor: '#E9F0FB' }}>
        <Row className="mt-2" style={{ backgroundColor: '#E9F0FB' }}>
          <div className="text-center">
            <Typography variant="heading1" className="color-dark-teal">DISEASE REPORT</Typography>
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

  );
}


