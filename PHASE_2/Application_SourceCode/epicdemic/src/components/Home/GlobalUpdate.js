import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { Row, Col, Image } from "react-bootstrap";
import covidMap from "../../static/covidMap.png"
import Typography from '@mui/material/Typography'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../../styles/Home.css';
import '../../styles/GlobalUpdates.css';
import markerIcon from '../../static/markerIcon.svg';
import L from 'leaflet';

const GlobalUpdate = () => {
  const [checked, setChecked] = useState(false);
  const [stats, setStats] = useState({
    "totalCases": 0,
    "deaths": 0,
    "dailyCases": 0
  });
  const [cases, setCases] = useState([]);

  useEffect(() => {
    // On initial load, get all the relevant stats and cases
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setStats({
          totalCases: data.cases,
          deaths: data.deaths,
          dailyCases: data.todayCases
        })
      })

    setCases([...markerElements]);
  }, []);

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
  
  const getMarkerIcon = (size) => {
    if (size < 100) return smallMarkerIcon
    else if (size < 300) return mediumMarkerIcon
    else if (size < 1000) return largeMarkerIcon
    else return hugeMarkerIcon
  }

  return(
    <Col className="pt-3 pb-4">
      <div className="text-center">
        <Typography variant="heading1" className="color-dark-teal">WORLDWIDE COVID</Typography>
      </div>
      <Row className="bg-darkteal justify-content-end pb-4 pt-4 pe-4">
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
          <UpdateBox number={stats.totalCases} text="total cases" bgColor={mediumBlue} fontC='white'/>
          <UpdateBox number={stats.deaths} text="deaths" bgColor="white" fontC={mediumTeal}/>
          <UpdateBox number={stats.dailyCases} text="daily cases" bgColor={mediumBlue} fontC='white'/>
        </Col>
        <Col className="text-center pb-4">
          <MapContainer
            className="leaflet-container1"
            center={[35, 25]} 
            zoom={2}
            zoomControl={false}
            minZoom={2}
            maxBounds={bounds}
            maxBoundsViscosity={0.7}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
              subdomains='abcd'
            />
              {cases.map((elem) => 
                <Marker
                  id={elem.id}
                  position={[elem.latitude, elem.longitude]}
                  icon={getMarkerIcon(elem.cases)}
                />
              )}
          </MapContainer>
        </Col>
      </Row>
    </Col>
  )
}

export default GlobalUpdate

function UpdateBox(props) {
  let convertedNum = (Math.round(props.number * 10 / 1000000) / 10) + 'M';
  return(
    <Row className="m-2 me-4 mb-4 py-3 border-radius-small" style={{backgroundColor: props.bgColor, boxShadow: '0px 1px 5px #CCCCCC'}}>
      <Col>
        <Row className="align-self-center justify-content-center">
          <Typography variant="heading2" sx={{display: 'block', color: props.fontC, textAlign: 'center'}}>{convertedNum}</Typography>
        </Row>
        <Row className="align-self-center justify-content-center">
          <Typography variant="bodyImportant" sx={{display: 'block', color: props.fontC, textAlign: 'center'}}>{props.text}</Typography>
        </Row>
      </Col>
    </Row>
  )
}

const bounds = [
  [100, -180],
  [-100, 180],
]

const markerElements = [
  {id: 1, latitude: 51.505, longitude: -0.09, cases: 28},
  {id: 2, latitude: 43.5, longitude: -11, cases: 58},
  {id: 3, latitude: 22.5, longitude: -18, cases: 125},
  {id: 4, latitude: 40.5, longitude: -90, cases: 234},
  {id: 5, latitude: -25.5, longitude: 125, cases: 54},
  {id: 6, latitude: -43.5, longitude: 77, cases: 18},
  {id: 7, latitude: 33.5, longitude: 33, cases: 343},
  {id: 8, latitude: 25.5, longitude: 130, cases: 1222},
  {id: 9, latitude: -17.5, longitude: 22, cases: 5555},
  {id: 10, latitude: 58, longitude: 45, cases: 24},
  {id: 11, latitude: 33, longitude: 58, cases: 152},
  {id: 12, latitude: 20, longitude: 90, cases: 555},
  {id: 13, latitude: 30, longitude: 65, cases: 28},
  {id: 14, latitude: 40, longitude: 75, cases: 333},
  {id: 15, latitude: 35, longitude: 80, cases: 152},
]

let smallMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [8, 8],
})

let mediumMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [16, 16],
})

let largeMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [32, 32],
})

let hugeMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [64, 64],
})