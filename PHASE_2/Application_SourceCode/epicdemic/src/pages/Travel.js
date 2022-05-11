import React from 'react'
import { Col, Container, Row } from "react-bootstrap"
import midDot from "../static/mid-dot.svg"
import '../styles/Destination.css'
import '../styles/DestinationFinder.css'
import BlueCard from "../components/Travel/BlueCard";
import InfoRow3 from "../components/DestinationFinder/InfoRow3";
import HeaderInfoRow3 from "../components/DestinationFinder/HeaderInfoRow3";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarComp from "../components/NavBar";
import { Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { getDestination } from "../apiCalls";
import { travelStatusColor, travelStatus } from "../styles/Theme";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepButton from '@mui/material/StepButton';
import { ThreeCircles } from "react-loader-spinner";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

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

function Travel(travelStat) {
  const [data, setData] = useState(null);
  const { code } = useParams();
  const steps = ['BEFORE YOU TRAVEL', 'ENTERING THE REGION', "WHILE YOU'RE THERE",];
  const [activeStep, setActiveStep] = React.useState(0);

  const defaultEnterChecks = [
    {title: "QUARANTINE RULES", date: "Last updated 23/02/22", text: "International travellers are not required to quarantine upon arrival. However, the CDC recommends that travellers stay home and self-quarantine for 7 days after arrival. Travellers should take a test again 3-5 days after arrival; if a test is not available or results are delayed, travellers are recommended to stay home and self-quarantine for a total of 10 days after travelling"},
    {title: "VACCINATION REQUIREMENTS", date: "Last updated 23/02/22", text: vacineCheck},
    {title: "TESTING REQUIREMENTS", date: "Last updated 23/02/22", text: testCheck},
    {title: "DOCUMENTATION DECLARATION", date: "Last updated 23/02/22", text: docCheck}
  ]

  useEffect(() => {
    if(code == null) return;

    async function fetchData() {
      const response = await fetch(`http://localhost:8000/v1/locations/${code}/travel`).then(res => res.json())
      const data = response.data
      var enterChecks = []
      const country = await getDestination(code);

      if(data.quarantine == undefined){
        enterChecks[0] = defaultEnterChecks[0]
      }else{
        enterChecks[0] = {
          title: "QUARANTINE RULES",
          date: data.quarantine.date,
          text: data.quarantine.text 
        }
      }

      if(typeof data.vaccine_info == "undefined") {
        enterChecks[1] = defaultEnterChecks[1]
      }else{
        enterChecks[1] = {
          title: "VACCINATION REQUIREMENTS",
          date: data.vaccine_info.last_updated,
          text: data.vaccine_info.info 
        }
      }

      if(data.testing == undefined) {
        enterChecks[2] = defaultEnterChecks[2]
      }else{
        enterChecks[2] = {
          title: "TESTING REQUIREMENTS",
          date: data.testing.date,
          text: data.testing.text 
        }
      }

      if(data.declaration == undefined) {
        enterChecks[3] = defaultEnterChecks[3]
      }else{
        enterChecks[3] = {
          title: "DOCUMENTATION DECLARATION",
          date: data.declaration.date,
          text: data.declaration.text 
        }
      }


      const ArrivalCheck = []
      if(typeof data.mask !== "undefined") {
        ArrivalCheck.push({
          title: "Mask",
          date: data.mask.last_updated,
          text: data.mask.text 
        })
      }
      if(typeof data.tracing !== "undefined") {
        ArrivalCheck.push({
          title: "Tracing",
          date: data.tracing.last_updated,
          text: data.tracing.text 
        })
      }
      if(typeof data.event_info !== "undefined") {
        ArrivalCheck.push({
          title: "Event",
          date: data.event_info.last_updated,
          text: data.event_info.entry_status 
        })
      }
      if(typeof data.attractions_info !== "undefined") {
        ArrivalCheck.push({
          title: "Attraction",
          date: data.attractions_info.last_updated,
          text: data.attractions_info.entry_status 
        })
      }
      if(typeof data.shopping_info !== "undefined") {
        ArrivalCheck.push({
          title: "Shopping",
          date: data.shopping_info.last_updated,
          text: data.shopping_info.entry_status 
        })
      }

      for(var i = 0; i < data.area_restriction.length; i++) {
        var restriction = data.area_restriction[i]
        ArrivalCheck.push({
          title: restriction.restrictionType,
          date: restriction.last_updated,
          text: restriction.text 
        })
      }

      var newData = {
        code: code,
        country: country.country,
        travelStatus: country.travel_status,
        areaR: data.area_restriction,
        mask: data.mask,
        areaP: data.area_policy,
        tracing: data.tracing,
        attraction: data.attractions_info,
        entryInfo: data.attractions_info,
        eventInfo: data.event_info,
        shoppingInfo: data.shopping_info,
        vaccineInfo: data.vaccine_info,
        enterCheck: enterChecks,
        ArrivalCheck: ArrivalCheck
      }
      console.log(newData)
      // From the code, look up the relevant travel status details
      setData(newData)
    }
    fetchData();
  }, [code])

  if(data == null) {
    return(
      <div/>
    )
  }

  function getContent(index) {
    if (index == 0) {
      return <div className="m-4">
        <Typography variant="heading3" className="color-dark-teal mb-1">Check if you are considered a vaccinated traveller</Typography>
        <Typography variant="bodyText" className="color-dark-teal mb-1">{validCheck}</Typography>
        <Typography variant="heading3" className="color-dark-teal mb-1">Ensure you can provide proof</Typography>
        <Typography variant="bodyText" className="color-dark-teal mb-1">{proofCheck}</Typography>
      </div>
    } else if (index == 1) {
      return <Row className="mt-4 mb-5">
        {data.enterCheck.map((check) => 
          <Col md={6}>
            <BlueCard check={check}></BlueCard>
          </Col>
        )}
      </Row>
    } else if (index == 2) {
      return <Row className="mt-4 mb-5">
        {data.ArrivalCheck.map((check) => 
          <Col md={6}>
            <BlueCard check={check}></BlueCard>
          </Col>
        )}
      </Row>
    }
  }
  return(
    <Container style={{margin: '0% 15%', width: 'auto'}}>
      <Col>
        <Row>
          <Typography variant="bodyHeading" className="color-dark-teal">
            TRAVEL STATUS
          </Typography>
        </Row>
        <Row className="align-items-center pt-1 justify-content-start mt-3 mb-3">
          <Col md={1} className="justify-content-center">
            <CircleIcon style={{color: travelStatusColor(data.travelStatus)}}/>
          </Col>
          <Col className="pt-1">
            <Typography variant="bodyImportant" style={{color: travelStatusColor(data.travelStatus)}}>{travelStatus(data.travelStatus)}</Typography>
          </Col>
        </Row>
        <Typography variant="heading1" className="color-dark-teal">Visiting {data.country}</Typography>
        <div className="mb-4">
          <Stepper nonLinear activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton icon={<CircleOutlinedIcon className="color-medium-teal"/>} onClick={() => {setActiveStep(index)}}>
                  <Typography variant="heading2" className="color-dark-teal">{label}</Typography>
                </StepButton>
                <StepContent>
                  {getContent(index)}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
        {/* <div class="square border-start border-3 mt-3 mb-5" id="tealBorder">
          <Typography variant="heading2" className="color-dark-teal mb-3">BEFORE YOU TRAVEL</Typography>
          <Typography variant="heading3" className="color-dark-teal mb-1">Check if you are considered a vaccinated traveller</Typography>
          <Typography variant="bodyText" className="color-dark-teal mb-1">{validCheck}</Typography>
          <Typography variant="heading3" className="color-dark-teal mb-1">Ensure you can provide proof</Typography>
          <Typography variant="bodyText" className="color-dark-teal mb-5">{proofCheck}</Typography>
          <Typography variant="heading2" className="color-dark-teal mb-3">ENTERING THE REGION</Typography>
          <Row className="mt-4 mb-5">
            {data.enterCheck.map((check) => 
              <Col md={6}>
                <BlueCard check={check}></BlueCard>
              </Col>
            )}
          </Row>
          <Typography variant="heading2" className="color-dark-teal mb-3">WHILE YOU'RE THERE</Typography>
          <div>{
            data.ArrivalCheck.map((check) => 
              <BlueCard check={check}></BlueCard>
            )}
          </div>
        </div> */}
      </Col>
    </Container>
  )
}

export default Travel

const recCities = [
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
  { 'city': 'Manilla', 'safetyRating': 'Low to medium levels of threat', 'diseaseRisk': 'Medium', 'travelStatus': 'Open with restrictions', 'lockdown': 'No'},
]