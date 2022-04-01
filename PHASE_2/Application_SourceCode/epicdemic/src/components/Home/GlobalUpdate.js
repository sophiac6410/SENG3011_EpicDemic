import React, { useState } from "react";
import Switch from "react-switch";
import { Row, Col, Image } from "react-bootstrap";
import '../../styles/Home.css'
import Carousel from "react-multi-carousel";
import covidMap from "../../static/covidMap.png"
import CovidTabs from "./CovidTabs";
import countrybreakdown from "../../static/countrybreakdown.png"


function UpdateBox(props) {
  if(props.color == "blue") {
    return(
      <Row className="bg-blue m-2 me-4 mb-4 p-1">
        <Col>
          <Row className="align-self-center justify-content-center"  style={{"font-size": "30px", "color": "white", "font-weight": "bold"}}>{props.number}</Row>
          <Row className="align-self-center justify-content-center text-white"  style={{"font-size": "15px", "color": "white", "font-weight": "bold"}}>{props.text}</Row>
        </Col>
      </Row>
    )
  }else if(props.color == "white"){
    return(
      <Row className="bg-lightblue m-2 me-4 mb-4 p-1">
        <Col>
          <Row className="align-self-center justify-content-center"  style={{"font-size": "30px", "color": "#726FE7", "font-weight": "bold"}}>{props.number}</Row>
          <Row className="align-self-center justify-content-center" style={{"font-size": "15px", "color": "#726FE7", "font-weight": "bold"}}>{props.text}</Row>
        </Col>
      </Row>
    )
  }
}

function GlobalUpdate(){
  const [checked, setChecked] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 1,
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

  return(
    <Col className="pt-4 pb-4 mt-3">
      {/* <Row className="pe-5 justify-content-center"> */}
        <Row className="h3-title mb-2 justify-content-center">GLOBAL COVID UPDATES</Row>
        <Row className="bg-darkteal justify-content-end pb-4 pt-4 pe-4">
          <Col md={1}>
            <Row className="align-self-center justify-content-end pe-3" style={{"font-size": "20px", "color": "white", "font-weight": "bold"}}>Cases</Row>
          </Col>
          <Col md={1} className="text-center">
            <Switch
              checked={checked}
              onChange={() => setChecked(!checked)}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={48}
              className="react-switch align-self-center"
              id="material-switch"
              />
          </Col>
          <Col md={1}>
            <Row className="align-self-center justify-content-start" style={{"font-size": "20px", "color": "white", "font-weight": "bold"}}>Vaccines</Row>
          </Col>
        </Row>
        <Row className="bg-darkteal justify-content-center align-items-center">
          <Col md={3} className="align-self-center ms-4">
            <UpdateBox number="481M" text="total cases" color="blue"></UpdateBox>
            <UpdateBox number="6.11M" text="deaths" color="white"></UpdateBox>
            <UpdateBox number="1.7M" text="daily cases" color="blue"></UpdateBox>
          </Col>
          <Col className="text-center pb-4">
            <img src={covidMap} width="900px" height="350px"></img>
          </Col>
        </Row>

        <Row className="justify-content-center align-items-center" style={{ padding: '30px' }}>
          <Col xs={6}>
            <CovidTabs></CovidTabs>
          </Col>
          <Col>
            <img src={countrybreakdown}></img>
          </Col>
        </Row>  
    </Col>
  )
}

export default GlobalUpdate