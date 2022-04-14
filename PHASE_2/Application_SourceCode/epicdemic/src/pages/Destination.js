import { Container, Row, Col } from "react-bootstrap"
import { NavLink, Outlet, useParams } from "react-router-dom"
import '../styles/Destination.css'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Typography from '@mui/material/Typography'
import NavbarComp from "../components/NavBar";
import API_URL from "../config.json"
import { DestinationTabs } from "../styles/Button";
import { useNavigate, } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { CircleNotifications, CircleNotificationsOutlined } from "@mui/icons-material";


const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'blue'
};

function Destination() {
  const [dest, setDest] = useState(null);
  const [saved, setSaved] = useState(false);
  const { code } = useParams();
  let navigate = useNavigate(); 

  useEffect(() => {
    if (code === null) return;
    // Get the country and code
    // TODO: Dummy data (Need to call an endpoint)
    const country = "PHILIPPINES"; // For now
    setDest({
      code: code,
      country: country
    });
    
    console.log("use effect destination.js code is " + code);
  }, [code])

  if (dest === null) {
    return (
      <Footer/>
    )
  }

  const saveApiCall = async (meth) => {
    try {
      const response = await fetch(`${API_URL.API_URL}/v1/users/location/${code}`, {
        method: meth,
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('token')
        }
      });
      const data = await response.json();
      if (!data.ok) {
        console.log(data);
        alert(data.data.error);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleClickSave = (event) => {
    setSaved(event.target.checked);
    const meth = 'PUT'
    saveApiCall(meth);
  }

  return(
    <div>
      <NavbarComp bg={true}/>
      {/* <TinySearch className="bg-lightblue"></TinySearch> */}
      <div className="d-flex justify-content-start align-items-center flex-start mt-3 mx-5">
        <div className="text-center m-3">
          <Checkbox sx={{display:'block', mx: 'auto'}} icon={<FavoriteBorder fontSize="large" className="color-medium-teal"/>} checkedIcon={<Favorite fontSize="large" className="color-medium-teal"/>} onClick={handleClickSave} />
          <Typography variant="caption">Save</Typography>
        </div>
        <div className="text-center m-3">
          <Checkbox sx={{display:'block', mx: 'auto'}} icon={<NotificationsNoneIcon fontSize="large" className="color-medium-teal"/>} checkedIcon={<NotificationsActiveIcon fontSize="large" className="color-medium-teal"/>} />
          <Typography variant="caption">Notify Me</Typography>
        </div>
        <div className="text-center m-3">
          <Checkbox sx={{display:'block', mx: 'auto'}} icon={<AddCircleOutlineOutlinedIcon fontSize="large" className="color-medium-teal"/>} checkedIcon={<AddCircleOutlinedIcon fontSize="large" className="color-medium-teal"/>} onClick={handleClickSave} />
          <Typography variant="caption">Add To Trip</Typography>
        </div>
      </div>
      <Container style={{margin: '0% 15%', width: 'auto'}}>
        <div className="pt-4 pb-4 d-flex">
          <Col>
            <Typography variant="title" className="color-dark-teal">{dest.country}</Typography>
            <Typography variant="bodyText">Last updated on 25/03/22 </Typography>
          </Col>
          <div class="d-flex justify-content-end flex-end">
            <NavLink to="" style={linkStyle}>
              <DestinationTabs>Overview</DestinationTabs>
            </NavLink>
            <NavLink to="travel" style={linkStyle}>
              <DestinationTabs>Travel</DestinationTabs>
            </NavLink>
            <NavLink to="covid" style={linkStyle}>
              <DestinationTabs>Diseases</DestinationTabs>
            </NavLink>
            <NavLink to="Book" style={linkStyle}>
              <DestinationTabs>Book</DestinationTabs>
            </NavLink>
          </div>
        </div>
      </Container>
      <Outlet></Outlet>
    </div>
  )
}

export default Destination