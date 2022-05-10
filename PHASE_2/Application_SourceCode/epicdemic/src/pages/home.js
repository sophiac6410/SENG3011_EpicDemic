import React from 'react';
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
import NavbarComp from '../components/NavBar'
import Button from '@mui/material/Button';
import { DarkButton, WhiteButton } from "../styles/Button";
import { fabClasses } from "@mui/material";
import { useNavigate, } from 'react-router-dom';
import { useEffect } from "react";
import { getUserSaved } from "../apiCalls";


const intro = "Epicdemic collates and analyses a diverse range of government, airline, COVID and tourism data to provide you with the confidence you need to book your next trip."
const slogan = "Effortless. Efficient. Epic"
function Home() {
  let navigate = useNavigate();
  const goDestination = () =>{  
    navigate('/finder');
  }

  const goPlaner = () => {
    navigate('/planner');
  }

  const [savedLocations, setSavedLocations] = React.useState([]);
  useEffect (() => {
    async function callApi () {
      const data = await getUserSaved();
      console.log(data);
      setSavedLocations(data.saved_locations);
    }
    callApi();
  }, []);

  return (
      <div className="bg-off-white">
        <div className="bg-forest" style={{height: '100vh'}}>
            <NavbarComp bg={false}></NavbarComp>
            <div>
              <div id="header">
                <div>
                  <Typography variant="superTitle" className="color-white mt-5" style={{display: "inline", fontFamily: 'Open Sans'}}>Travel </Typography>
                  <Typography variant="superTitle" className="color-dark-teal mt-5" style={{display: "inline", fontFamily: 'Open Sans'}}>Safely</Typography>
                </div>
                <div className="text-center" style={{margin: '1% 15%'}}>
                  <Typography variant="title" className="color-dark-teal" style={{ fontSize: '24px'}}>
                    {slogan}
                  </Typography>
                </div>
                <div className="text-center" style={{margin: '1% 15%', width: '40%', fontSize: '11px', fontFamily: 'Open Sans'}}>
                  <Typography variant="heading2" className="color-black">
                    {intro}
                  </Typography>
                </div>
                <div className="mt-5 mb-5 d-flex">
                  <DarkButton onClick={goDestination} className="align-self-center pt-3 pb-3" style={{width: "180px"}}>  
                    <Typography variant="bodyHeading">Find a destination</Typography>
                  </DarkButton>
                  <WhiteButton onClick={goPlaner} className="align-self-center ms-4 pt-3 pb-3" style={{width: "180px"}}>
                    <Typography variant="bodyHeading">Plan my trip</Typography>
                  </WhiteButton>
                </div>
                <Search></Search>
              </div>
            </div>
        </div>
        <NewsBar></NewsBar>
        <LocationBar locations={savedLocations}></LocationBar>
        <Row className="mt-5 mb-5 p-1 ps-3 align-items-center justify-content-center">
          <UpdateBar></UpdateBar>
        </Row>
        <GlobalUpdate></GlobalUpdate>
        <DiseaseReportBar parent={0}></DiseaseReportBar>
      </div>
  );
}

export default Home;
