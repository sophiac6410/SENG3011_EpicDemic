import { Col, Container, Row } from "react-bootstrap"
import React from "react"
// import '../../styles/Home.css'
import Typography from '@mui/material/Typography'

function AirBox() {
  return(
    <Row className="bg-mblue m-1 mb-2 pt-2 pb-2" style={{"border-radius": "10px"}}>
      <Col md={3} className="align-self-center">
        <div className="ps-3 text-grey" style={{"font-size": "23px"}}>Philipines</div>
      </Col>
      <Col style={{"font-size": "16px"}}>Garuda Indonesia negotiating terms of Airbus, Boeing orders.
<b>Last update 22.03.22 10:28 AM</b>
      </Col>
    </Row>
  )
}

function AirUpdateBar() {
  return(
    <Col className="ms-4 mb-3">
      <Row className="bg-white">
        <Col>
          <Row>
            <Typography variant="heading1" className="color-dark-teal">GLOBAL COVID UPDATES</Typography>
          </Row>
          <AirBox></AirBox>
          <AirBox></AirBox>
          <AirBox></AirBox>
          <AirBox></AirBox>
          <AirBox></AirBox>
        </Col>
      </Row>
    </Col>
  )
}

export default AirUpdateBar