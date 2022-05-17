import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { Row, Col } from "react-bootstrap";
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
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { getDiseaseArticles, getDiseaseList } from "../../adapters/diseaseAPI";

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

const API_KEY="pub_72536ca59b511c07890630cdccd42c8723d4";

export default function DiseaseReportBar({code}) {
  const [diseaseData, setDiseaseData] = useState([]);
  const [diseaseData2, setDiseaseData2] = useState([]);
  const [diseaseList, setDiseaseList] = useState([]);
  const [disease, setDisease] = useState('Covid-19');

  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer GbHl378d8f4L1y1MdQB0HoCpGj8mzBCwjMbSnshBFWFymm7LNClDzQ0e69ZUzioyb95U4W5RdYbY'
    },
  };

  useEffect(() => {
    if (code === null) return;

    async function fetchList () {
      const data = await getDiseaseList(code);
      if (data.length > 0) {
        setDiseaseList(data);
      }
      else {
        setDiseaseList([ 'Covid-19' ])
      }
    }
    fetchList();
  }, []);

  useEffect(() => {
    if (diseaseData === []) return;

    console.log('the disease is', disease)
    async function fetchData2() {
      const data = await getDiseaseArticles(code, disease);
      console.log('return', data)
      if (data.length > 2) {
        setDiseaseData(data.slice(0, (data.length / 2)))
        setDiseaseData2(data.slice((data.length / 2), data.length))
      }
      else {
        setDiseaseData([])
        setDiseaseData2(data)
      }
    }
    fetchData2();

  }, [disease])

  const handleChange = (event) => {
    setDisease(event.target.value);
  };


  return(
    <div style={{ padding: '3% 10% 10%', backgroundColor: '#E9F0FB' }}>
      <Row className="mt-2" style={{ backgroundColor: '#E9F0FB' }}>
        <Col>
          <Typography variant="heading1"> Disease Reports </Typography>
        </Col>
        <Col style={{marginTop: "15px"}}>
            <div style={{ minWidth: 200, display: "flex", justifyContent: "flex-end"}}>
            <FormControl sx={{ minWidth: 200 }}>
              <Select
                displayEmpty
                label="."
                value={disease}
                onChange={handleChange}
              >
                { diseaseList.map((data, idx) => {
                  return (
                    <MenuItem value={data} idx={idx}><Typography variant="heading2">{data}</Typography></MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>
          </Col>

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


