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
import Typography from '@mui/material/Typography';
import CovidStat from "../static/philStats.png"
import CovidTabs from "../components/Diseases/CovidTabs";
import DiseaseReportBar from "../components/Home/DiseaseReportBar";

function Covid() {
  const [disease, setDisease] = useState('Covid-19');
  const [data, setData] = useState(null);
  const { code } = useParams();

  useEffect(() => {
    if (code == null) return;

    async function fetchData() {
      const trend = await fetch('https://disease.sh/v3/covid-19/historical/PHL?lastdays=all').then(res => res.json())

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
        casesChartData: casesChartData
      });
    }

    fetchData();
  }, [code])


  const handleChange = (event) => {
    setDisease(event.target.value);
  };

  if (data === null) {
    return (
      <div/>
    )
  }

  return(
    <Container>
      <Row className="title-h2 mt-5">
          <Col>
            <Box sx={{ minWidth: 300 }}>
            <FormControl sx={{ minWidth: 300 }}>
              <Select
                value={disease}
                displayEmpty
                onChange={handleChange}
                label="."
              >
                <MenuItem value={'Covid-19'}> <div className="title-h3">Covid19</div> </MenuItem>
                <MenuItem value={'Dengue'}> <div className="title-h3">Dengue</div> </MenuItem>
                <MenuItem value={'HIV/AIDS'}> <div className="title-h3">HIV/AIDS</div> </MenuItem>
              </Select>
            </FormControl>
          </Box>
          </Col>
      </Row>

      <Row style={{ paddingTop: '20px' }}>
        <DiseaseTabs></DiseaseTabs>
      </Row>

      <Row style={{ maxWidth: 600, paddingTop: '40px' }}>
      <div className="title-h3"> Statistics </div>
      </Row>
      <Row>
        <div className="stat">

          <div className="image-holder">
            <CovidTabs casesChartData={data.casesChartData}></CovidTabs>
          </div>

          <div className="flex-stats">
            <div className="teal box">
              <Typography variant="h7" component="h2">
                11.1 B
              </Typography>
              <Typography variant="subtitle2" component="h2">
                doses administered
              </Typography>
            </div>
            <div className="lightblue box">
              <Typography variant="h7" component="h2">
                57.8 %
              </Typography>
              <Typography variant="subtitle2" component="h2">
                fully vaccinated
              </Typography>
            </div>
            <div className="teal box">
              <Typography variant="h7" component="h2">
                20.5 % 
              </Typography>
              <Typography variant="subtitle2" component="h2">
                received booster
              </Typography>
            </div>
          </div>

        </div>

      </Row>
      <DiseaseReportBar parent={1}></DiseaseReportBar>
    </Container>
  )
}

export default Covid

const monthNames = ["January", "February", "March",  "April", "May", "June",  "July", "August", "September", "October", "November", "December"];

const monthName = (mon) => {
  return monthNames[mon - 1];
}