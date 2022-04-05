import DiseaseTabs from "../components/Diseases/Tabs"
import { Container, Row, Col } from "react-bootstrap"
import * as React from 'react';
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
  const [disease, setDisease] = React.useState('Covid-19');

  const handleChange = (event) => {
    setDisease(event.target.value);
  };

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

          <div className="flex-stats">
            <div className="teal box">
              <Typography variant="h7" component="h2">
                478 M
              </Typography>
              <Typography variant="subtitle2" component="h2">
                total cases
              </Typography>
            </div>
            <div className="lightblue box">
              <Typography variant="h7" component="h2">
                6.11 M
              </Typography>
              <Typography variant="subtitle2" component="h2">
                deaths
              </Typography>
            </div>
            <div className="teal box">
              <Typography variant="h7" component="h2">
                1.7 M
              </Typography>
              <Typography variant="subtitle2" component="h2">
                daily cases
              </Typography>
            </div>
          </div>

          <div className="image-holder">
            <img src={CovidStat}></img>
          </div>

        </div>

        <div className="stat">

          <div className="image-holder">
            <CovidTabs></CovidTabs>
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