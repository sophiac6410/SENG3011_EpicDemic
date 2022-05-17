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
import { getCovidArticles } from "../../adapters/diseaseAPI";

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join(' ');
}

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
  const [diseaseData2, setDiseaseData2] = useState([]);

  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {

    async function fetchData2() {
      const data = await getCovidArticles();
      console.log('return', data)
      setDiseaseData(data.slice(0, (data.length / 2)))
      setDiseaseData2(data.slice((data.length / 2), data.length))
    }
    fetchData2();

  }, [])

  return(
    <div style={{ padding: '3% 10% 10%', backgroundColor: '#E9F0FB' }}>
      <Row className="mt-2" style={{ backgroundColor: '#E9F0FB' }}>
        <div className="text-center">
          <Typography variant="heading1" className="color-dark-teal">RECENT DISEASE REPORTS</Typography>
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
                        { (new Date(data.date_of_publication)).toDateString() }
                      </Typography>
                      <Typography variant="bodyHeading" component="div" align="left" sx={{ mb: 1 }}>
                          { (data.headline) }
                      </Typography>
                      <LightButton size="small" align="left" sx={{ padding: '2% 4%', my: 2 }} onClick={() => { window.open(data.url) }}>
                        <Typography variant='bodyImportant'>
                          Read more
                        </Typography>
                      </LightButton>
                      <Typography variant="caption" color="text.secondary" sx={{display: 'block'}} gutterBottom>
                        Source: { 'Promed' }
                      </Typography>
                    </CardContent>
                    </Card>

                    {
                      diseaseData.length < 3 
                      ? <></>
                      : <Card className="m-2" sx={{ borderRadius: '10px', padding: '4%', paddingBottom: '0.5%', height: '240px' }} >
                          <CardContent>
                            <Typography variant="caption" color="text.secondary">
                              { (new Date(diseaseData[idx].date_of_publication)).toDateString() }
                            </Typography>
                            <Typography variant="bodyHeading" component="div" align="left" sx={{ mb: 1 }}>
                                { diseaseData[idx].headline }
                            </Typography>
                            <LightButton size="small" align="left" sx={{ padding: '2% 4%', my: 2 }} onClick={() => { window.open(data.url) }}>
                              <Typography variant='bodyImportant'>
                                Read more
                              </Typography>
                            </LightButton>
                            <Typography variant="caption" color="text.secondary" sx={{display: 'block'}} gutterBottom>
                              Source: { 'Promed' }
                            </Typography>
                          </CardContent>
                          </Card>
                    }

                    </div>
                )
                })}
            
          </Carousel>
        </div>

      </Row>
    </div>

  );
}


