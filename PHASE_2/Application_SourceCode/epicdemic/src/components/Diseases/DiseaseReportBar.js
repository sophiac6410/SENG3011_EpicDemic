import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { Row } from "react-bootstrap";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Carousel from "react-multi-carousel";
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

export default function DiseaseReportBar({code, disease}) {
  const [diseaseData, setDiseaseData] = useState([]);
  const [diseaseData2, setDiseaseData2] = useState([]);

  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer GbHl378d8f4L1y1MdQB0HoCpGj8mzBCwjMbSnshBFWFymm7LNClDzQ0e69ZUzioyb95U4W5RdYbY'
    },
  };

  useEffect(() => {
    if (diseaseData === []) return;

    console.log('the disease is', disease)
    async function fetchData() {
      const data = await fetch(`https://prod.greatescape.co/api/travel/countries/${code}/corona`, options).then(res => res.json())
      console.log('printing data', data)
      setDiseaseData(data.news.slice(0, (data.news.length / 2)))
      setDiseaseData2(data.news.slice((data.news.length / 2), data.news.length))
    }
    fetchData()
  }, [disease])

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
            
              {diseaseData2.map((data, idx) => {

                  return (
                    <div className="news-container-col">
                      <Card className="m-2" sx={{ borderRadius: '10px', padding: '4%', paddingBottom: '0.5%', height: '240px' }} >
                      <CardContent>
                        <Typography variant="caption" color="text.secondary">
                          {(new Date(data.date)).toDateString()}
                        </Typography>
                        <Typography variant="bodyHeading" component="div" align="left" sx={{ mb: 1 }}>
                            {data.title}
                        </Typography>
                        <LightButton size="small" align="left" sx={{ padding: '2% 4%', my: 2 }} onClick={() => { window.open(data.link) }}>
                          <Typography variant='bodyImportant'>
                            Read more
                          </Typography>
                        </LightButton>
                        <Typography variant="caption" color="text.secondary" sx={{display: 'block'}} gutterBottom>
                          Source: {data.pub}
                        </Typography>
                      </CardContent>
                      </Card>

                      <Card className="m-2" sx={{ borderRadius: '10px', padding: '4%', paddingBottom: '0.5%', height: '240px' }} >
                      <CardContent>
                        <Typography variant="caption" color="text.secondary">
                          {(new Date(diseaseData[idx].date)).toDateString()}
                        </Typography>
                        <Typography variant="bodyHeading" component="div" align="left" sx={{ mb: 1 }}>
                            {diseaseData[idx].title}
                        </Typography>
                        <LightButton size="small" align="left" sx={{ padding: '2% 4%', my: 2 }} onClick={() => { window.open(diseaseData[idx].link) }}>
                          <Typography variant='bodyImportant'>
                            Read more
                          </Typography>
                        </LightButton>
                        <Typography variant="caption" color="text.secondary" sx={{display: 'block'}} gutterBottom>
                          Source: {diseaseData[idx].pub}
                        </Typography>
                      </CardContent>
                      </Card>
                      </div>
                  )
                })}
            
          </Carousel>
        </div>
      </Row>
    </div>

  );
}


