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

const vacineCheck = <p>You must be vaccinated to enter this region.

<br /><br /><b>Allowed vaccines: </b>Moderna, Pfizer/BioNTech, Janssen (Johnson & Johnson), Sinovac, Sinopharm/BIBP, Oxford/AstraZeneca, Gamaleya, Sputnik V, Bharat Biotech, Covaxin</p>

const testCheck = <p><b>Requirement:</b> MANDATORY

<br /><br />All passengers on inbound international flights - including US citizens and fully vaccinated people - must present a negative COVID-19 test result</p>

const docCheck = <p><b>Required: </b> Yes

<br /><br />Arriving travellers must complete a passenger locator form within 24 hours of arrival.</p>

const maskCheck = <p><b>Required: </b> Yes, conditional

<br /><br />Some states and territories require residents to wear masks while out in public. Violators may be subject to fines and be denied entry to businesses and use of public transport. Most states and territories have voluntary measures or measures restricted to specific venues and municipalities.Enforcement varies widely and is not consistently enforced below the federal level. Masks must be worn in federal government buildings as well as on inter-state transport, including at airports and onboard flights, trains, planes, intercity buses and ferries until at least 13 September.</p>

const lockCheck = <p>Under lockdown since 16 Mar 2020

<br></br><br></br>The following provinces and cities shall be placed under Alert Level 1 until March 31, 2022.
<br></br>
<br></br>NCR
<br></br>Abra
<br></br>Apayao
<br></br>Baguio City
<br></br>Kalinga
<br></br>Dagupan City
<br></br><br></br>
<br></br>See more
<br></br><br></br>
<br></br>Meanwhile, the rest of the Philippines is under Alert Level 2 until March 31, 2022.
<br></br><br></br>
<br></br>As of March 1, restaurants, businesses, movie theaters, shopping malls and public transport are allowed to operate at full capacity. Starting Feb. 10, international tourists and business travelers from more than 150 countries are allowed to enter the Philippines for the first time in nearly two years. Fully vaccinated travelers do not have to quarantine in government-designated centers if they test negative prior to arrival. The government had previously planned to open borders on Dec. 1, but postponed it due to the Omicron variant.</p>

const event = <p>Full capacity is allowed.
<br></br><br></br>
For alert level 2: Max of 50% indoor venue capacity* and 70% outdoor venue capacity</p>

const foodCheck = <p>Open with restrictions</p>


const enterChecks = [
  {title: "QUARANTINE RULES", date: "Last updated 23/02/22", text: "International travellers are not required to quarantine upon arrival. However, the CDC recommends that travellers stay home and self-quarantine for 7 days after arrival. Travellers should take a test again 3-5 days after arrival; if a test is not available or results are delayed, travellers are recommended to stay home and self-quarantine for a total of 10 days after travelling"},
  {title: "VACCINATION REQUIREMENTS", date: "Last updated 23/02/22", text: vacineCheck},
  {title: "TESTING REQUIREMENTS", date: "Last updated 23/02/22", text: testCheck},
  {title: "DOCUMENTATION DECLARATION", date: "Last updated 23/02/22", text: docCheck}
]

const EnterBoard = enterChecks.map(function(check) {
  return (
    <Col md={6}>
      <BlueCard check={check}></BlueCard>
    </Col>
  )
});


const ArrivalCheck = [
  {title: "Masks", date: "Last updated 23/02/22", text: maskCheck},
  {title: "Lockdowns", date: "Last updated 23/02/22", text: lockCheck},
  {title: "Events", date: "Last updated 23/02/22", text: event},
  {title: "Restuarants and Bars", date: "Last updated 23/02/22", text: foodCheck}
]

const arriveBoard = ArrivalCheck.map(function(check) {
  return (
    <Row>
      <BlueCard check={check}></BlueCard>
    </Row>
  )
});

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
            {EnterBoard}
          </Row>
          <Row><div className="title-h3 mt-5">While you’re there</div></Row>
          <div>{arriveBoard}</div>
        </div>
      </Col>
    </Container>
  )
}

export default Travel