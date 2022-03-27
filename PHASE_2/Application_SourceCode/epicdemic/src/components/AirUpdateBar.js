import { Col, Container, Row } from "react-bootstrap"
import React from "react"
import '../styles/Home.css'

class AirBox extends React.Component {
  render() {
    return(
      <Row className="bg-white m-1 mb-2 pt-2 pb-2" style={{"border-radius": "10px"}}>
        <Col md={3} className="align-self-center">
          <div className="ps-3 text-grey" style={{"font-size": "23px"}}>Philipines</div>
        </Col>
        <Col style={{"font-size": "16px"}}>Garuda Indonesia negotiating terms of Airbus, Boeing orders.
<b>Last update 22.03.22 10:28 AM</b>
        </Col>
      </Row>
    )
  }
}

class AirUpdateBar extends React.Component {
  render() {
    return(
      <Col className="mt-2 ms-4 me-3 mb-3">
        <Row className="bg-grey">
          <Col>
            <Row>
              <div className="h3-title pt-2 pb-1 ms-3">Airline Updates</div>
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
}

export default AirUpdateBar