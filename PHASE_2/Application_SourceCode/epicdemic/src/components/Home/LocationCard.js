import { Card, Col, Row } from "react-bootstrap";
import midCaution from "../../static/mid-caution.svg"
import midDot from "../../static/mid-dot.svg"
import { useNavigate, } from 'react-router-dom';
import React from "react";

  
function LocationCard() {
  let navigate = useNavigate(); 
  const routeChange = () =>{  
    navigate('/destination/PHILIPPINES');
  }

  return (
    <Card className="m-3" onClick={ routeChange }>
      <Card.Body>
        <Card.Title style={{fontSize: "23px", fontWeight: "bold"}}>Philipines</Card.Title>
        <Card.Subtitle className="pt-1 text-muted">Overall Advice:</Card.Subtitle>
        <Row className="align-items-center pt-1 justify-content-start">
          <Col md={3}>
            <Row className="justify-content-center">
            <img src={midCaution} width="35px" height="35px">
            </img>
            </Row>
          </Col>
          <Col className="pt-1">
            <text style={{"font-size": "20px"}}>Exercise Caution</text>
          </Col>
        </Row>
        <Card.Subtitle className="pt-2 text-muted">Travel Status:</Card.Subtitle>
        <Row className="align-items-center pt-1 justify-content-start">
          <Col md={3} className="justify-content-center">
            <Row className="justify-content-center">
              <img src={midDot} width="15px" height="15px">
              </img>
            </Row>
          </Col>
          <Col className="pt-1">
            <text style={{"font-size": "20px"}}>Open with Restrictions</text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
export default LocationCard