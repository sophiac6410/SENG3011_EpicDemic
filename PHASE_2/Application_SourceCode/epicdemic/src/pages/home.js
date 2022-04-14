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
import NavbarComp from '../components/Navbar'
import { DarkButton, WhiteButton } from "../styles/Button";
import { fabClasses } from "@mui/material";
import { useNavigate, } from 'react-router-dom';

const intro = "Epicdemic collates and analyses a diverse range of government, airline, COVID and tourism data to provide you with the confidence you need to book your next trip. Not sure where to go? Use our destination finder and trip planner to view our personalised recommendations.  Turn on notifications to keep informed of the latest updates."
function Home() {
  let navigate = useNavigate();
  const goDestination = () =>{  
    navigate('/finder');
  }

  const goPlaner = () => {
    navigate('/planner');
  }

  return (
      <div style={{backgroundColor: '#F4FBFF'}}>
        <div className="bg-sky" style={{height: '100vh'}}>
            <NavbarComp bg={false}></NavbarComp>
          <div>
            <div id="header">
              <Typography variant="title" className="color-white mt-5">Travel safely with Epicdemic</Typography>
              <div className="text-center" style={{margin: '3% 15%'}}>
                <Typography variant="bodyImportant" className="color-white">
                  {intro}
                </Typography>
              </div>
              <div className="mt-1 mb-5 d-flex">
                <DarkButton onClick={goDestination} className="align-self-center me-5 pe-5 ps-5">  
                  <Typography variant="bodyImportant">Find a destination</Typography>
                </DarkButton>
                <WhiteButton onClick={goPlaner} className="align-self-center ms-4 pe-5 ps-5">
                  <Typography variant="bodyImportant">Plan my trip</Typography>
                </WhiteButton>
              </div>
              <Search></Search>
            </div>
          </div>
        </div>
        <NewsBar></NewsBar>
        <LocationBar></LocationBar>
        <Row className="mt-5 mb-5 p-1 ps-3 align-items-center justify-content-center">
          <UpdateBar></UpdateBar>
        </Row>
        <GlobalUpdate></GlobalUpdate>
        <DiseaseReportBar parent={0}></DiseaseReportBar>
      </div>
  );
}

export default Home;
