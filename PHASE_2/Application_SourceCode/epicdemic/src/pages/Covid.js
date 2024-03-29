import DiseaseTabs from "../components/Diseases/Tabs"
import { useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../styles/Covid.css'
import { getDestination } from "../apiCalls";
import Typography from '@mui/material/Typography';
import CovidStat from "../static/philStats.png"
import CovidTabs from "../components/Diseases/CovidTabs";
import DiseaseReportBar from "../components/Diseases/DiseaseReportBar";
import NavbarComp from "../components/NavBar";
import { diseaseRiskColor, diseaseRisk } from "../styles/Theme";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { TailSpin } from "react-loader-spinner"

function Covid() {
  const [disease, setDisease] = useState('Covid-19');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)
  const { code } = useParams();

  useEffect(() => {
    if (code == null) return;
    
    async function fetchData() {
      setLoading(true)
      const trend = await fetch(`https://disease.sh/v3/covid-19/historical/${code}?lastdays=all`).then(res => res.json())
      const country = await getDestination(code);
  
      const casesChartData = [];

      var lastDate = null;
      var lastDateTotal = 0;
      for (var i in trend.timeline.cases) {
        const arr = i.split("/");
        const dateStr = `${monthName(arr[0])} ${arr[2]}`
        
        if (dateStr !== lastDate) {
          if (lastDate !== null) {
            casesChartData.push({
              name: lastDate,
              data: lastDateTotal
            })      
          }

          lastDate = dateStr;
          lastDateTotal = trend.timeline.cases[i];
        } else {
          lastDateTotal += trend.timeline.cases[i];
        }
      }

      console.log(casesChartData)
      setData({
        casesChartData: casesChartData,
        diseaseRisk: country.disease_risk
      });
      setLoading(false)
    }

    fetchData();
  }, [code, disease])


  const handleChange = (event) => {
    setDisease(event.target.value);
  };

  if (data === null) {
    return (
      <div style={{display: "flex", marginBottom: "500px", marginTop: "200px"}} className="flex-row justify-content-center align-items-center">
        <TailSpin color='#70C4E8'></TailSpin>
      </div>
    )
  }

  return(
    <>
    <Container style={{margin: '0% 15%', width: 'auto'}}>
      <div className="d-flex">
        <Typography variant="bodyHeading" className="color-dark-teal me-4">DISEASE RISK</Typography>
        <LocalHospitalIcon sx={{color: diseaseRiskColor(data.diseaseRisk), fontSize: 'large', mt: 1}}/>
        <Typography variant="bodyImportant" className="mx-2 mt-1" sx={{color: diseaseRiskColor(data.diseaseRisk)}}>{diseaseRisk(data.diseaseRisk)}</Typography>
      </div>
      <Row className="mt-5">
        <Col>
          <Typography variant="heading1">Covid-19</Typography>
        </Col>
      </Row>

      <Row>
        <DiseaseTabs disease={disease}></DiseaseTabs>
      </Row>

      <Row style={{ maxWidth: 600, paddingTop: '40px' }}>
      <Typography variant="heading1"> Statistics</Typography>
      </Row>
      <Row>
        <div className="stat">

          <div className="image-holder">
            <CovidTabs casesChartData={data.casesChartData}></CovidTabs>
          </div>

          <div className="flex-stats">
            <div className="bg-dark-teal color-white box border-radius-med">
              <Typography variant="title">
                11.1 B
              </Typography>
              <Typography variant="bodyImportant">
                doses administered
              </Typography>
            </div>
            <div className="bg-light-blue color-dark-teal box border-radius-med">
              <Typography variant="title">
                57.8 %
              </Typography>
              <Typography variant="bodyImportant">
                fully vaccinated
              </Typography>
            </div>
            <div className="bg-dark-teal color-white box border-radius-med">
              <Typography variant="title">
                20.5 % 
              </Typography>
              <Typography variant="bodyImportant">
                received booster
              </Typography>
            </div>
          </div>
        </div>
      </Row>
    </Container>
    <DiseaseReportBar code={code}></DiseaseReportBar>
    </>
  )
}

export default Covid

const monthNames = ["January", "February", "March",  "April", "May", "June",  "July", "August", "September", "October", "November", "December"];

const monthName = (mon) => {
  return monthNames[mon - 1];
}