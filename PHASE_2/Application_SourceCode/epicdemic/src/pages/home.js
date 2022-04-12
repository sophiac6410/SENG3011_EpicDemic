import {Container, Col, Row, Image} from "react-bootstrap";
import AirUpdateBar from "../components/Home/AirUpdateBar";
import GlobalUpdate from "../components/Home/GlobalUpdate";
import LocationBar from "../components/Home/LocationBar";
import NewsBar from "../components/Home/NewsBar";
import Search from "../components/Home/Search";
import UpdateBar from "../components/Home/UpdateBar";
import bigLoading from "../static/bigLoading.svg"
import DiseaseRadar from "../components/Home/DiseaseRadar";
import DiseaseReportBar from "../components/Home/DiseaseReportBar";
import Typography from '@mui/material/Typography'
import NavbarComp from '../components/Home/NavBar'

function Home() {
  return (
      <div style={{"background-color": "white"}}>
        <div className="bg-sky">
          <NavbarComp></NavbarComp>
          <Row>
            <div id="header">
              <Typography variant="title" className="color-dark-teal">Travel safely with Epicdemic!</Typography>
              <Typography variant="bodyCaption" sx={ { paddingBottom: '20px' }}>
                Start searching to find your perfect destination...
              </Typography>
              <Search></Search>
            </div>
          </Row>
        </div>
        <NewsBar></NewsBar>
        <LocationBar></LocationBar>
        <Row className="mt-5 mb-5 p-1 ps-3 align-items-center justify-content-center">
          <Col md={4} className="text-center justify-content-center pe-5">
            <Image width="250px" height="250px" classname="text-center" src={bigLoading}></Image>
          </Col>
          {/* <AirUpdateBar></AirUpdateBar> */}
          <UpdateBar></UpdateBar>
        </Row>
        <GlobalUpdate></GlobalUpdate>
        <DiseaseRadar></DiseaseRadar>
        <DiseaseReportBar parent={0}></DiseaseReportBar>
      </div>
  );
}

export default Home;
