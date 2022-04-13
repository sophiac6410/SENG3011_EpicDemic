import React, { useState } from "react";
import Switch from "react-switch";
import { Row, Col, Image } from "react-bootstrap";
// import '../../styles/Home.css'
import covidMap from "../../static/covidMap.png"
import Typography from '@mui/material/Typography'


function UpdateBox(props) {
  return(
    <Row className="m-2 me-4 mb-4 py-3 border-radius-small" style={{backgroundColor: props.bgColor, boxShadow: '0px 1px 5px #CCCCCC'}}>
      <Col>
        <Row className="align-self-center justify-content-center">
          <Typography variant="heading2" sx={{display: 'block', color: props.fontC, textAlign: 'center'}}>{props.number}</Typography>
        </Row>
        <Row className="align-self-center justify-content-center">
          <Typography variant="bodyImportant" sx={{display: 'block', color: props.fontC, textAlign: 'center'}}>{props.text}</Typography>
        </Row>
      </Col>
    </Row>
  )
}

function GlobalUpdate(){
  const [checked, setChecked] = useState(true);

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

  const mediumTeal = '#0F83A0';
  const mediumBlue = '#70C4E8';
  const lightTeal = '#62B6CB';
  return(
    <Col className="pt-3 pb-4" style={{margin: '5% 10%'}}>
      {/* <Row className="pe-5 justify-content-center"> */}
        <div className="text-center">
          <Typography variant="heading1" className="color-dark-teal">WORLDWIDE COVID</Typography>
        </div>
        <Row className="justify-content-end pb-4 pt-4 pe-4">
          <Col md={1}>
            <Row className="align-self-center justify-content-end">
              <Typography variant="bodyHeading" sx={{textAlign: 'right'}}>Cases</Typography>
            </Row>
          </Col>
          <Col md={1} className="text-center">
            <Switch
              checked={checked}
              onChange={() => setChecked(!checked)}
              onColor={lightTeal}
              onHandleColor={mediumTeal}
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
            <Row className="align-self-center justify-content-start">
              <Typography variant="bodyHeading">Vaccines</Typography>
            </Row>
          </Col>
        </Row>
        <Row className="bg-darkteal justify-content-center align-items-center pb-5">
          <Col md={3} className="align-self-center ms-4">
            <UpdateBox number="481M" text="total cases" bgColor={mediumBlue} fontC='white'></UpdateBox>
            <UpdateBox number="6.11M" text="deaths" bgColor="white" fontC={mediumTeal}></UpdateBox>
            <UpdateBox number="1.7M" text="daily cases" bgColor={mediumBlue} fontC='white'></UpdateBox>
          </Col>
          <Col className="text-center pb-4">
            <img src={covidMap} width="100%" height="100%"></img>
          </Col>
        </Row>

        {/* <Row className="justify-content-center align-items-center" style={{ padding: '30px' }}>
          <Col xs={6}>
            <CovidTabs></CovidTabs>
          </Col>
          <Col>
            <img src={countrybreakdown}></img>
          </Col>
        </Row>   */}
    </Col>
  )
}

export default GlobalUpdate