import { Col, Container, Row } from "react-bootstrap"
import midDot from "../static/mid-dot.svg"
import '../styles/Destination.css'
import BlueCard from "../components/Travel/BlueCard";

const validCheck = <p>
  Before you book your travel, check if you meet Australia’s definition of fully vaccinated for international travel purposes. To meet Australia’s vaccination requirements and be considered a ‘fully vaccinated’ traveller for the purpose of Australia’s border arrangements, you need to provide evidence that you either: 
  <br /><ul><li>meet Australia's definition of fully vaccinated for international travel purposesare a child under the age of 12</li>
  <li>are a child aged 12 to 17 years who will be travelling to Australia with at least one adult who is fully vaccinated; or</li>
  <li>cannot be vaccinated for medical reasons.</li></ul></p>;

const proofCheck = <p>If you were vaccinated in Australia, you will need to show airline staff your International COVID-19 Vaccination Certificate (ICVC). You can download your ICVC using the Express Plus Medicare app or your Medicare online account through myGov. The ICVC is provided in PDF format for you to print or hold electronically on your phone. Airlines will ask for this when you check-in to your flight.

<br /><br />If you were vaccinated overseas and do not have an ICVC, you will need to present your foreign vaccination certificate to airline staff.</p>
function Travel() {
  return(
    <Container className="mt-4">
      <Col>
        <Row>
          <div className="larger-body">
            TRAVEL STATUS
          </div>
        </Row>
        <Row className="align-items-center pt-1 justify-content-start mt-3">
          <Col md={1} className="justify-content-center">
            <Row className="justify-content-center">
              <img src={midDot} width="25px" height="25px">
              </img>
            </Row>
          </Col>
          <Col className="pt-1">
            <text style={{"font-size": "22px", "color": "#FFA800"}}>Open with Restrictions</text>
          </Col>
        </Row>
        <Row className="title-h2 mt-5"><div>Visiting the Phillippines</div></Row>
        <div class="square border-start border-3 mt-5 mb-5" id="tealBorder">
          <Row><div className="title-h3 mb-5">Before you travel</div></Row>
          <Row><div className="title-h4 mb-2">Check if you are considered a vaccinated traveller</div></Row>
          <Row><div className="body-text mb-2">{validCheck}</div></Row>
          <Row><div className="title-h4 mt-3">Ensure you can provide proof</div></Row>
          <Row><div className="body-text">{proofCheck}</div></Row>
          <Row><div className="title-h3 mt-5">Entering the region</div></Row>
          <Row className="mt-4">
            <Col md={6}>
              <BlueCard></BlueCard>
            </Col>
            <Col md={6}>
              <BlueCard></BlueCard>
            </Col>
          </Row>
          <Row className="mt-4 mb-4">
            <Col md={6}>
              <BlueCard></BlueCard>
            </Col>
            <Col md={6}>
              <BlueCard></BlueCard>
            </Col>
          </Row>
          <Row><div className="title-h3 mt-5">While you’re there</div></Row>
          <Row className="mt-4"><BlueCard></BlueCard></Row>
          <Row className="mt-4"><BlueCard></BlueCard></Row>
          <Row className="mt-4"><BlueCard></BlueCard></Row>
        </div>
      </Col>
    </Container>
  )
}

export default Travel