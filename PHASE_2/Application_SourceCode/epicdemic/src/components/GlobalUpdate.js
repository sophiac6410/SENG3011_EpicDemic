import React from "react";
import Switch from "react-switch";
import { Row, Form, Col } from "react-bootstrap";
import '../styles/Home.css'
import Carousel from "react-multi-carousel";
import covidMap from "../static/covidMap.png"

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

function UpdateBox(props) {
  if(props.color == "blue") {
    return(
      <Row className="bg-blue m-2 me-4 mb-4 p-3">
        <Col>
          <Row className="align-self-center justify-content-center"  style={{"font-size": "35px", "color": "white", "font-weight": "bold"}}>{props.number}</Row>
          <Row className="align-self-center justify-content-center text-white"  style={{"font-size": "20px", "color": "white", "font-weight": "bold"}}>{props.text}</Row>
        </Col>
      </Row>
    )
  }else if(props.color == "white"){
    return(
      <Row className="bg-lightblue m-2 me-4 mb-4 p-3">
        <Col>
          <Row className="align-self-center justify-content-center"  style={{"font-size": "35px", "color": "#726FE7", "font-weight": "bold"}}>{props.number}</Row>
          <Row className="align-self-center justify-content-center" style={{"font-size": "20px", "color": "#726FE7", "font-weight": "bold"}}>{props.text}</Row>
        </Col>
      </Row>
    )
  }
}

class GlobalUpdate extends React.Component{
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return(
      <Col className="bg-lightpurple pt-4 pb-4 mt-3">
        <Row className="pe-5">
          <Col md={9}>
            <div className="sub-title mb-2">GLOBAL COVID UPDATES</div>
          </Col>
          <Col className="align-self-center">
            <Row>
              <Col>
                <Row className="align-self-center justify-content-end pe-3" style={{"font-size": "20px", "color": "white", "font-weight": "bold"}}>Cases</Row>
              </Col>
              <Col>
                <Switch
                    checked={this.state.checked}
                    onChange={this.handleChange}
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
              <Col>
                <Row className="align-self-center justify-content-start" style={{"font-size": "20px", "color": "white", "font-weight": "bold"}}>Vaccines</Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <div>
          <Carousel
            responsive={responsive} 
            autoPlay={false}
            arrows={true}
            shouldResetAutoplay={false}
            centerMode={true}
          >
            <Col className="mt-3">
              <UpdateBox number="481M" text="total cases" color="blue"></UpdateBox>
              <UpdateBox number="6.11M" text="deaths" color="white"></UpdateBox>
              <UpdateBox number="1.7M" text="daily cases" color="blue"></UpdateBox>
            </Col>
            <div>
              <img src={covidMap} width="950px" height="425px" className="p-3"></img>
            </div>
          </Carousel>
        </div>
      </Col>
    )
  }
}

export default GlobalUpdate