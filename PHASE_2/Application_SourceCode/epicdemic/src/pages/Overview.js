import { Container, Row, Col } from "react-bootstrap"
import { NavLink, Outlet, useParams } from "react-router-dom"
import vChart from "../static/phiVacine.svg"
import covidMAP from "../static/phiCovidMap.png"
import map from "../static/phiMap.png"
import midDot from "../static/mid-dot.svg"
import wRed from "../static/warningRed.svg"
import wYellow from "../static/warningYellow.svg"
import NewsBar from "../components/Travel/NewsBar"
import '../styles/Destination.css'
import Typography from '@mui/material/Typography'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../styles/Overview.css'
import markerIcon from '../static/markerIcon2.svg';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import React, { useState, useEffect } from "react";
import CircleIcon from '@mui/icons-material/Circle';
import WarningIcon from '@mui/icons-material/Warning';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { colorScore } from "../styles/Theme"

const intro = "Philippines, island country of Southeast Asia in the western Pacific Ocean. It is an archipelago consisting of more than 7,000 islands and islets lying about 500 miles (800 km) off the coast of Vietnam. Manila is the capital, but nearby Quezon City is the country’s most-populous city."
const safetySource = "The safety and security ratings determined by GeoSure GeoSafeScores which analyzes crime, health and economic data, official travel alerts, local reporting and a variety of other sources.  Scores go from 1 (not likely) to 100 (very likely)."
const covidSource = <p>Health advice is continually changing as we learn more about COVID-19 and new variants are discovered. Rules and restrictions to prevent outbreaks can change quickly. It’s important to regularly check the rules in the destinations you’re travelling to and transiting through, as well as the requirements at the Australian border. These may differ between state and territory jurisdictions.
<br /> <br />Read the Australian Government’s global health advisory and step-by-step guide to travel during COVID-19 for more information.</p>

const safetyDis = [
  {title: "MEDICAL", text: "Likelihood of illness or disease, assessment of water and air quality, and access to reliable medical care", score: 34},
  {title: "WOMEN", text: "Likelihood of inappropriate behavior against females", score: 0},
  {title: "PHYSICAL HARM", text: "Likelihood of injury due to harmful intent", score: 36},
  {title: "THEFT", text: "Likelihood of theft", score: 36},
  {title: "POLITICAL FREEDOM", text: "Potential for infringement of political rights or political unrest", score: 50},
  {title: "LGBTQ", text: "Likelihood of harm or discrimination against LGBTQ persons or groups and level of caution required at location", score: 39}
]

const SafetyBoard = safetyDis.map(function(props) {
    const bgColor = colorScore(props.score);
    return(
      <Row className="ps-5 mt-4 align-items-center">
        <Col>
          <Typography variant="bodyImportant" className="color-medium-teal">{props.title}</Typography>
          <div>
            <Typography variant="bodyText">{props.text}</Typography>
          </div>
        </Col>
        <Col md={1}>
          <div style={{color: "white", backgroundColor: bgColor}} className="text-center border-radius-med">
            <Typography variant="bodyImportant">{props.score}</Typography>
          </div>
        </Col>
      </Row>
    )
});

function Overview() {
  const [data, setData] = useState(null);
  const [dest, setDest] = useState(null);
  const { code } = useParams();

  useEffect(() => {
    if (code === null) return;
    
    async function fetchData() {
      
      const covid = await fetch(`https://disease.sh/v3/covid-19/countries/${code}?strict=true`).then(res => res.json())
      var newData = {
        code: code,
        country: covid.country,
        cases: covid.cases,
        todayCases: covid.cases - covid.recovered - covid.deaths,
        population: covid.population
      }

      // TODO: use our own percentage vaccination stat
      const vaccine = await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${code}?lastdays=all&fullData=false`).then(res => res.json())
      var total = vaccine.timeline[Object.keys(vaccine.timeline).pop()] / 3;

      newData["vaccinationPercentage"] = total * 100 / newData.population;

      setData(newData);

      const locationData = await fetch(`http://localhost:8000/v1/locations/${code}`).then(res => res.json())
      
      console.log(locationData);
      setDest({
        code: code,
        country: locationData.data.country,
        longitude: parseFloat(locationData.data.longitude),
        latitude: parseFloat(locationData.data.latitude),
        safetyScore: parseInt(locationData.data.safety_score),
        travelStatus: parseInt(locationData.data.travel_status),
        adviceLevel: parseInt(locationData.data.advice_level),
        diseaseRisk: parseInt(locationData.data.disease_risk)
      })
    }

    fetchData();
  }, [code])
  
  const getCentre = () => {
    // TODO: This should take in a country, look up it's coordinates
    // and centre on it
    return [dest.latitude, dest.longitude];
  }

  if (data == null || dest == null) {
    return (
      <div/>
    )
  }

  return(
    <>
    <Container style={{margin: '0% 15%', width: 'auto'}}>
      <Row>
        <Col>
          <MapContainer
            style={{ width: 350, height: 350}}
            center={getCentre()} 
            zoom={5}
            zoomControl={false}
            minZoom={5}
            maxBounds={bounds}
            maxBoundsViscosity={0.7}
          >
            <TileLayer
              subdomains='abcd'
              accessToken={jawgAccess}
              attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}'
            />
          </MapContainer>
        </Col>
        <Col>
          <Row className="align-items-center">
            <div className="pt-3 pb-3 pe-1 ps-1 text-center border-radius-large bg-yellow">
              <Typography variant="bodyImportant">OVERALL ADVICE: EXERCISE CAUTION</Typography>
            </div>
          </Row>
          <Row>
            <Typography variant="bodyText" className="color-dark-teal pt-4 pb-4">{intro}</Typography>
          </Row>
          <Row className="align-items-center justify-content-start">
            <Col md={4}>
              <Typography variant="bodyText" className="color-dark-teal ">TRAVEL STATUS</Typography>
            </Col>
            <Col md={1}>
              <CircleIcon className="color-yellow" sx={{fontSize: 18}}/>
            </Col>
            <Col className="pt-1">
            <Typography variant="bodyImportant" className="color-dark-teal">Open With Restrictions</Typography>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-start">
            <Col md={4}>
            <Typography variant="bodyText" className="color-dark-teal">SAFETY</Typography>
            </Col>
            <Col md={1}>
                <WarningIcon className="color-yellow" sx={{fontSize: 18}}/>
            </Col>
            <Col className="pt-1 text-start">
              <Typography variant="bodyImportant" className="color-dark-teal">Low to medium levels of threat</Typography>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-start">
            <Col md={4}>
            <Typography variant="bodyText" className="color-dark-teal">DISEASE RISK</Typography>
            </Col>
            <Col md={1}>
                <LocalHospitalIcon className="color-red" sx={{fontSize: 18}}/>
            </Col>
            <Col className="pt-1">
              <Typography variant="bodyImportant" className="color-dark-teal">High</Typography>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{"justify-content": "space-between"}} className="mt-5 mb-5 pt-4 justify-content-center align-items-center">
        <Col>
          <Typography variant="heading2" className="color-dark-teal">Safety</Typography>
          <div className="mt-4 ps-2" style={{flexDirection: "row", display: "flex"}}>
              <WarningIcon className="color-yellow"></WarningIcon>
              {/* <img src={wYellow} width="30px" height="30px" style={{flexDirection: "column"}} >
              </img> */}
              <Typography variant="bodyImportant" className="color-dark-teal ms-3">Low to medium levels of threat</Typography>
          </div>
        </Col>
        <Col md={3} className="text-center pt-3 pb-3 bg-yellow border-radius-med">
          <Row><Typography variant="heading2">{dest.safetyScore}</Typography></Row>
          <Row><Typography variant="bodyText" sx={{textAlign: 'center'}}>OVERALL SAFETY RATING</Typography></Row>
        </Col>
      </Row>
      <ul>{SafetyBoard}</ul>
      <Typography variant="caption" className="mt-5 mb-5">{safetySource}</Typography>
      <Typography variant="heading2" className="mb-4 mt-5 pt-4">COVID-19 Statistics</Typography>
      <Row className="mb-5 justify-content-start">
        <Col md={5} className="pt-5 me-5">
          <Typography variant="title" className="color-medium-teal mt-5">DECLINING</Typography>
          <Typography variant="bodyHeading" className="color-medium-teal">CONDITION</Typography>
          <div className="end">
            <CircularProgressbarWithChildren
              value={Math.round(data.vaccinationPercentage)}
              styles={buildStyles({            
                strokeLinecap: 'butt',    
                pathColor: '#0F83A0',
                width: '20px'
              })}
              >
              <div 
                className="medium-teal"
                style={{ textAlign: "center"}}
              >
                <Typography variant="title">{data.vaccinationPercentage.toFixed(1)}%</Typography>
                <Typography variant="heading3">vaccinated</Typography>
              </div>
            </CircularProgressbarWithChildren>            
          </div>
          <Typography variant="title" className="medium-teal">{data.todayCases}</Typography>
          <Typography variant="bodyHeading" className="medium-teal mb-5">CASES TODAY</Typography>
        </Col>
        <Col md={6}>
          <MapContainer
            className="leaflet-container2"
            style={{ width: 500, height: 500}}
            center={getCentre()} 
            zoom={5}
            zoomControl={false}
            minZoom={5}
            maxBounds={bounds}
            maxBoundsViscosity={0.7}
          >
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
              url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
            />
            <Marker 
              id={1}
              position={getCentre()}
              icon={hugeMarkerIcon}
            />
          </MapContainer>
        </Col>
      </Row>
      <Typography variant="caption" className="mb-5">{covidSource}</Typography>
    </Container>
    <Container style={{margin: '0% 10% 3%', width: 'auto'}}>
      <NewsBar></NewsBar>
    </Container>
    </>
  )
}

export default Overview

const bounds = [
  [100, -180],
  [-100, 180],
]

const jawgAccess = "YOUjn99aXN03O3VlgCA2zMByVd0j9i1wkTyQdMHmIPUoWZbUyqprbroD4TpOdYMl"

const markerElements = [
  {id: 1, latitude: 35, longitude: 15, cases: 300},
  {id: 2, latitude: 40, longitude: 10, cases: 200},
]

let hugeMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [64, 64],
})