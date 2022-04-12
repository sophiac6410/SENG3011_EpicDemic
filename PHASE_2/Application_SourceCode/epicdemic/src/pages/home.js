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

const intro = "Epicdemic collates and analyses a diverse range of government, airline, COVID and tourism data to provide you with the confidence you need to book your next trip. Not sure where to go? Use our destination finder and trip planner to view our personalised recommendations.  Turn on notifications to keep informed of the latest updates."
function Home() {
  return (
      <div style={{"background-color": "white"}}>
        <div className="bg-sky">
          <NavbarComp></NavbarComp>
          <Row>
            <div id="header">
              <Typography variant="title" className="color-white mt-5">Travel safely with Epicdemic!</Typography>
              <div className="text-center m-5">
                <Typography variant="bodyText" className="color-white" sx={ { paddingBottom: '20px' }}>
                  {intro}
                </Typography>
              </div>
              <Col className="mt-1 mb-5">
                <button className="btn-base btn-dark bg-dark-teal align-self-center me-3 pe-4 ps-4">
                  <Typography variant="bodyImportant">Find a destination</Typography>
                </button>
                <button className="btn-base bg-light-blue align-self-center ms-3 pe-5 ps-5">
                  <Typography variant="bodyImportant" className="color-dark-teal">Plan my trip</Typography>
                </button>
              </Col>
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
