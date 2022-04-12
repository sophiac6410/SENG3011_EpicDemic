import React from "react";

import "../../styles/Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import Typography from '@mui/material/Typography'
import diseases from '../../static/diseases.png'
import diseasestats from '../../static/diseasestats.png'
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";


export default function DiseaseRadar() {
  return(
    <div className="text-center pt-5 mb-3">
      <Typography variant="heading1" className="color-dark-teal">DISEASE RADAR</Typography>
      <Row style={{ padding: '30px' }}>
        <Col sm={8}>
          <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={diseasestats}></img>
        </Col>
        <Col sm={4}>
          <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={diseases}></img>
        </Col>
      </Row> 
    </div>
  )
}

