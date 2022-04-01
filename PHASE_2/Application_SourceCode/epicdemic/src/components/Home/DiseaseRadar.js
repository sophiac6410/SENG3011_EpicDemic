import React from "react";

import "../../styles/Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";

import diseases from '../../static/diseases.png'
import diseasestats from '../../static/diseasestats.png'
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";


export default function DiseaseRadar() {
  return(
    <div style={{ padding: '30px', marginBottom: '30px' }}>
      <Row className="h3-title mb-2 justify-content-center">DISEASE RADAR</Row>
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

