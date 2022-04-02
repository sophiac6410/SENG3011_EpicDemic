import { Container, Row, Col } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import map from "../static/phiMap.png"
import vChart from "../static/phiVacine.svg"
import covidMAP from "../static/phiCovidMap.png"
import midCaution from "../static/mid-caution.svg"
import midDot from "../static/mid-dot.svg"
import wRed from "../static/warningRed.svg"
import wYellow from "../static/warningYellow.svg"
import NewsBar from "../components/Travel/NewsBar"
import '../styles/Destination.css'



const intro = "Philippines, island country of Southeast Asia in the western Pacific Ocean. It is an archipelago consisting of more than 7,000 islands and islets lying about 500 miles (800 km) off the coast of Vietnam. Manila is the capital, but nearby Quezon City is the country’s most-populous city."
const safetySource = "The safety and security ratings determined by GeoSure GeoSafeScores which analyzes crime, health and economic data, official travel alerts, local reporting and a variety of other sources.  Scores go from 1 (not likely) to 100 (very likely)."
const covidSource = <p>Health advice is continually changing as we learn more about COVID-19 and new variants are discovered. Rules and restrictions to prevent outbreaks can change quickly. It’s important to regularly check the rules in the destinations you’re travelling to and transiting through, as well as the requirements at the Australian border. These may differ between state and territory jurisdictions.
<br /> <br />Read the Australian Government’s global health advisory and step-by-step guide to travel during COVID-19 for more information.</p>

const SafetyScore = function SafetyScore() {
  return(
    <Row className="ps-5 mt-4 align-items-center">
      <Col>
        <div className="title-h4 medium-teal">MEDICAL</div>
        <div className="body-text mt-2">Likelihood of illness or disease, assessment of water and air quality, and access to reliable medical care</div>
      </Col>
      <Col md={1}>
        <div style={{backgroundColor: "#FECD6F", color: "white", borderRadius: "20px"}} className="text-center title-h4">34</div>
      </Col>
    </Row>
  )
}

function Overview() {
  return(
    <Container>
      <Row className="justify-content-center">
        <Col md={5}>
          <img src={map}></img>
        </Col>
        <Col md={6}>
          <Row className="justify-content-center align-items-center mt-5">
            <div style={{backgroundColor: "#FECD6F", borderRadius: "20px", fontSize: "23px"}} className="pt-4 pb-4 pe-2 ps-2 text-center">OVERALL ADVICE: EXERCISE CAUTION</div>
          </Row>
          <Row>
            <div className="body-text mb-5 mt-5">{intro}</div>
          </Row>
          <Row className="align-items-center pt-1 justify-content-start mt-3 ps-1">
            <Col md={5}>
              <div className="larger-body">TRAVEL STATUS</div>
            </Col>
            <Col md={1}>
              <Row className="justify-content-center">
                <img src={midDot} width="20px" height="20px">
                </img>
              </Row>
            </Col>
            <Col className="pt-1">
              <text className="body-text">Open With Restrictions</text>
            </Col>
          </Row>
          <Row className="align-items-center pt-1 justify-content-start mt-4 ps-1">
            <Col md={5}>
              <div className="larger-body">SAFETY</div>
            </Col>
            <Col md={1}>
              <Row className="justify-content-center">
                <img src={wYellow} width="20px" height="20px">
                </img>
              </Row>
            </Col>
            <Col className="pt-1 text-start">
              <text className="body-text">Low to medium levels of threat</text>
            </Col>
          </Row>
          <Row className="align-items-center pt-1 justify-content-start mt-4 ps-1">
            <Col md={5}>
              <div className="larger-body">DISEASE RISH</div>
            </Col>
            <Col md={1}>
              <Row className="justify-content-center">
                <img src={wRed} width="20px" height="20px">
                </img>
              </Row>
            </Col>
            <Col className="pt-1">
              <text className="body-text">High</text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{"justify-content": "space-between"}} className="mt-5 mb-5 justify-content-center align-items-center">
        <Col>
          <div className="title-h3 mt-5">Safety</div>
          <div className="mt-4 ps-2" style={{flexDirection: "row", display: "flex"}}>
              <img src={wYellow} width="30px" height="30px" style={{flexDirection: "column"}} >
              </img>
              <div style={{flexDirection: "column"}} className="larger-body ps-3">Low to medium levels of threat</div>
          </div>
        </Col>
        <Col md={3} className="text-center pt-3 pb-3" style={{backgroundColor: "#FECD6F", borderRadius: "20px"}}>
          <Row><div className="title-h3" style={{color: "#0F83A0"}}>44</div></Row>
          <Row><div className="body-text">OVERALL SAFETY RATING</div></Row>
        </Col>
      </Row>
      <SafetyScore></SafetyScore>
      <SafetyScore></SafetyScore>
      <SafetyScore></SafetyScore>
      <SafetyScore></SafetyScore>
      <SafetyScore></SafetyScore>
      <SafetyScore></SafetyScore>
      <div className="source-text mt-5 mb-5">{safetySource}</div>
      <div className="title-h3 mb-4 mt-5 pt-4">COVID-19 Statistics</div>
      <Row className="mb-5 justify-content-start">
        <Col md={5} className="pt-5">
          <div className="title-h2 medium-teal mt-5">DECLINING</div>
          <div className="title-h3 medium-teal">CONDITION</div>
          <div className="end">
            <img className="pe-5 me-5 mb-5" src={vChart}></img>
          </div>
          <div className="title medium-teal">112</div>
          <div className="title-h2 medium-teal mb-5">CASES TODAY</div>
        </Col>
        <Col md={6}>
          <img src={covidMAP} height="700px" width="700px"></img>
        </Col>
      </Row>
      <div className="source-text mb-5">{covidSource}</div>
      <NewsBar></NewsBar>
    </Container>
  )
}

export default Overview