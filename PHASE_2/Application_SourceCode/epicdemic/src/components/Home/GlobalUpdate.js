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
  const [stats, setStats] = useState(null);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    // On initial load, get all the relevant stats and cases
    async function fetchData() {
      try {
        const covid = await fetch(`https://disease.sh/v3/covid-19/all`).then(res => res.json())
        var newData = {
          cases: covid.cases,
          deaths: covid.deaths,
          todayCases: covid.todayCases
        }

        const vaccine = await fetch('https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all&fullData=false').then(res => res.json())
        var total = vaccine[Object.keys(vaccine).pop()]
        newData["doses"] = total;
        
        console.log("here " + newData);
        setStats(newData)

        const covidcases = await fetch('http://localhost:8000/v1/cases').then(res => res.json())
        
        console.log("marker elements")
        console.log(covidcases)
        const markerElements = [];
        for (var i in covidcases.data.cases_per_country) {
          const casedata = covidcases.data.cases_per_country[i];

          markerElements.push({
            id: i,
            longitude: parseFloat(casedata.longitude),
            latitude: parseFloat(casedata.latitude),
            cases: casedata.cases
          });
        }
        
        console.log("global update map");
        console.log(markerElements);
        setCases(markerElements);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
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
    if (size < 100000) return smallMarkerIcon
    else if (size < 300000) return mediumMarkerIcon
    else if (size < 10000000) return largeMarkerIcon
    else return hugeMarkerIcon
  }

  if (stats === null) {
    return (
      <div/>
    )
  }

  return(
    <Col className="pt-3 pb-4 mx-5">
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
      <Row className="bg-darkteal justify-content-center align-items-center pb-5 m-auto">
        <Col md={2} className="align-self-center ms-4">
          {checked ?
            <>
              <UpdateBox number={convertToBillions(stats.doses)} text="doses administered" bgColor={mediumBlue} fontC='white'/>
              <UpdateBox number={"59.2%"} text="fully vaccinated" color="white" bgColor="white" fontC={mediumTeal}/>
              <UpdateBox number={"11.3%"} text="received booster" bgColor={mediumBlue} fontC='white'/>
            </>
            :
            <>           
              <UpdateBox number={convertToMillions(stats.cases)} text="total cases" bgColor={mediumBlue} fontC='white'/>
              <UpdateBox number={convertToMillions(stats.deaths)} text="deaths" bgColor={mediumBlue} fontC='white'/>
              <UpdateBox number={convertToMillions(stats.todayCases)} text="daily cases" bgColor={mediumBlue} fontC='white'/>
            </>
          }
        </Col>
        <Col className="flex-end pb-4">
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

const convertToMillions = (num) => {
  return (Math.round(num * 10 / 1000000) / 10) + 'M';
}

const convertToBillions = (num) => {
  return (Math.round(num * 10 / 1000000000) / 10) + 'B';
}

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

const bounds = [
  [100, -180],
  [-100, 180],
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