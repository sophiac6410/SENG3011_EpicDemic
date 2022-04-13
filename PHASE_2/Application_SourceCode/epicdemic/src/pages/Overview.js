import { Container, Row, Col } from "react-bootstrap"
import { NavLink, Outlet, useParams, useLocation } from "react-router-dom"
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
  if(props.score != 0) {
    return (
      <Row className="ps-5 mt-4 align-items-center">
        <Col>
          <Typography variant="bodyImportant" className="medium-teal">{props.title}</Typography>
          <div>
            <Typography variant="bodyText">{props.text}</Typography>
          </div>
        </Col>
        <Col md={1}>
          <div style={{backgroundColor: "#FFC700", color: "white", borderRadius: "20px"}} className="text-center title-h4">
            <Typography variant="bodyCaption">{props.score}</Typography>
          </div>        
        </Col>
      </Row>
    )
  }else{
    return(
      <Row className="ps-5 mt-4 align-items-center">
        <Col>
          <Typography variant="bodyImportant" className="medium-teal">{props.title}</Typography>
          <div>
            <Typography variant="bodyText">{props.text}</Typography>
          </div>
        </Col>
        <Col md={1}>
          <div style={{backgroundColor: "#1CC02C", color: "white", borderRadius: "20px"}} className="text-center title-h4">
            <Typography variant="bodyCaption">{props.score}</Typography>
          </div>
        </Col>
      </Row>
    )
  }

});

function Overview() {
  const [dest, setDest] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state === null) return;
    // Get the country and code
    setDest({
      country: location.state.country,
      code: location.state.code
    })
  }, [location.key])
  
  const getCentre = () => {
    // TODO: This should take in a country, look up it's coordinates
    // and centre on it
    return [35, 15];
  }

  

  return(
    <Container>
      <Row className="justify-content-center">
        <Col md={5}>
          <MapContainer
            style={{ width: 450, height: 450}}
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
        <Col md={6}>
          <Row className="justify-content-center align-items-center mt-5">
            <div style={{backgroundColor: "#FECD6F", borderRadius: "20px", fontSize: "23px"}} className="pt-4 pb-4 pe-2 ps-2 text-center">
              <Typography variant="heading3" className="color-dark-teal">OVERALL ADVICE: EXERCISE CAUTION</Typography>
            </div>
          </Row>
          <Row>
            <Typography variant="bodyText" className="color-dark-teal pt-4 pb-4">{intro}</Typography>
          </Row>
          <Row className="align-items-center pt-1 justify-content-start mt-3 ps-1">
            <Col md={5}>
              <Typography variant="bodyCaption" className="color-dark-teal pt-4 pb-4">TRAVEL STATUS</Typography>
            </Col>
            <Col md={1}>
              <Row className="justify-content-center">
                <img src={midDot} width="20px" height="20px">
                </img>
              </Row>
            </Col>
            <Col className="pt-1">
            <Typography variant="bodyImportant" className="color-dark-teal pt-4 pb-4">Open With Restrictions</Typography>
            </Col>
          </Row>
          <Row className="align-items-center pt-1 justify-content-start mt-4 ps-1">
            <Col md={5}>
            <Typography variant="bodyCaption" className="color-dark-teal pt-4 pb-4">SAFETY</Typography>
            </Col>
            <Col md={1}>
              <Row className="justify-content-center">
                <img src={wYellow} width="20px" height="20px">
                </img>
              </Row>
            </Col>
            <Col className="pt-1 text-start">
              <Typography variant="bodyImportant" className="color-dark-teal pt-4 pb-4">Low to medium levels of threat</Typography>
            </Col>
          </Row>
          <Row className="align-items-center pt-1 justify-content-start mt-4 ps-1">
            <Col md={5}>
            <Typography variant="bodyCaption" className="color-dark-teal pt-4 pb-4">DISEASE RISK</Typography>
            </Col>
            <Col md={1}>
              <Row className="justify-content-center">
                <img src={wRed} width="20px" height="20px">
                </img>
              </Row>
            </Col>
            <Col className="pt-1">
              <Typography variant="bodyImportant" className="color-dark-teal pt-4 pb-4">High</Typography>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{"justify-content": "space-between"}} className="mt-5 mb-5 pt-4 justify-content-center align-items-center">
        <Col>
          <Typography variant="heading2" className="color-dark-teal">Safety</Typography>
          <div className="mt-4 ps-2" style={{flexDirection: "row", display: "flex"}}>
              <img src={wYellow} width="30px" height="30px" style={{flexDirection: "column"}} >
              </img>
              <Typography variant="bodyImportant" className="color-dark-teal ms-3">Low to medium levels of threat</Typography>
          </div>
        </Col>
        <Col md={3} className="text-center pt-3 pb-3" style={{backgroundColor: "#FECD6F", borderRadius: "20px"}}>
          <Row><div className="title-h3" style={{color: "#0F83A0"}}>44</div></Row>
          <Row><div className="body-text">OVERALL SAFETY RATING</div></Row>
        </Col>
      </Row>
      <ul>{SafetyBoard}</ul>
      <div className="source-text mt-5 mb-5">{safetySource}</div>
      <div className="title-h3 mb-4 mt-5 pt-4">COVID-19 Statistics</div>
      <Row className="mb-5 justify-content-start">
        <Col md={5} className="pt-5">
          <div className="title-h2 medium-teal mt-5">DECLINING</div>
          <div className="title-h3 medium-teal">CONDITION</div>
          <div className="end">
            <CircularProgressbarWithChildren
              value={75}
              styles={buildStyles({            
                strokeLinecap: 'butt',    
                pathColor: '#0F83A0'
              })}
              >
              <div 
                className="title-h2 medium-teal"
                style={{ textAlign: "center"}}
              >
                <text>75.2%</text>
                <br/>
                <text>vaccinated</text>
              </div>
            </CircularProgressbarWithChildren>            
          </div>
          <div className="title medium-teal">112</div>
          <div className="title-h2 medium-teal mb-5">CASES TODAY</div>
        </Col>
        <Col md={6}>
          <MapContainer
            className="leaflet-container2"
            style={{ width: 700, height: 700}}
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
            {markerElements.map((elem) => 
              <Marker 
                id={elem.id}
                position={[elem.latitude, elem.longitude]}
                icon={hugeMarkerIcon}
              />
            )}
          </MapContainer>
        </Col>
      </Row>
      <div className="source-text mb-5">{covidSource}</div>
      <NewsBar></NewsBar>
    </Container>
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