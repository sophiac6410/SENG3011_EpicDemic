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
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { LightButton } from '../../styles/Button';

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

export default function DiseaseReportBar() {
  const [diseaseData, setDiseaseData] = useState([]);

  useEffect(() => {
    if (diseaseData === []) return;

    async function fetchData() {
      console.log('fetching diseases data');
      const data = await fetch(`http://127.0.0.1:8000/v1/articles/?start_date=2021-01-01T10%3A10%3A10&end_date=2023-01-01T10%3A10%3A10&key_terms=Corona&timezone=Australia%2FSydney&start_range=1&end_range=6`).then(res => res.json())
      console.log('printing data', data)
      setDiseaseData(data.data.articles)
    }
    fetchData()
  }, [])

  return(
    <div style={{ padding: '3% 10% 10%', backgroundColor: '#E9F0FB' }}>
      <Row className="mt-2" style={{ backgroundColor: '#E9F0FB' }}>
        <div className="text-center">
          <Typography variant="heading1" className="color-dark-teal">RECENT DISEASE REPORT</Typography>
        </div>
        <div className="news-carousel" style={{ backgroundColor: '#E9F0FB' }}>
          <Carousel 
            swipeable={true}
            showStatus={false}
            responsive={responsive} 
          >
            
              {diseaseData.map((data, idx) => {

                  return (
                      <Card className="m-2" sx={{ borderRadius: '10px', padding: '4%', paddingBottom: '0.5%' }} >
                      <CardContent>
                        <Typography variant="caption" color="text.secondary">
                          {data.date_of_publication}
                        </Typography>
                        <Typography variant="bodyHeading" component="div" align="left" sx={{ mb: 1 }}>
                            {(data.headline).replace("PRO/AH/EDR>", "")}
                        </Typography>
                        <LightButton size="small" align="left" sx={{ padding: '2% 4%', my: 2 }} onClick={() => { window.open(data.url) }}>
                          <Typography variant='bodyImportant'>
                            Read more
                          </Typography>
                        </LightButton>
                        <Typography variant="caption" color="text.secondary" sx={{display: 'block'}} gutterBottom>
                          Source: Promed
                        </Typography>
                      </CardContent>
                      </Card>
                  )
                })}
            
          </Carousel>
        </div>
      </Row>
    </div>

  );
}


