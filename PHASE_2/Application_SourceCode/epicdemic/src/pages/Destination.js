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
import { saveDestination, getDestination, getUserSaved } from "../apiCalls";

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
    async function fetchData () {
      const data = await getDestination(code);
      setDest({
        code: code,
        country: data.country,
        lastUpdate: (new Date(data.last_update)).toLocaleDateString()
      });
      const data2 = await getUserSaved();
      console.log(data2.saved_locations);
      console.log(data2.saved_locations.includes(code));
      setSaved(data2.saved_locations.includes(code));
    }
    fetchData(code);
  }, [code]);

  if (dest === null) {
    return (
      <Footer/>
    )
  }

  const handleClickSave = (event) => {
    let method;
    if (saved) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }
    setSaved(event.target.checked);
    saveDestination(method, code);
  }

  return(
    <div>
      <NavbarComp bg={true}/>
      {/* <TinySearch className="bg-lightblue"></TinySearch> */}
      <Container style={{margin: '0% 8%', width: 'auto'}}>
        <div className="d-flex justify-content-start align-items-center mt-3">
          <div className="text-center m-3">
            <Checkbox sx={{display:'block', mx: 'auto'}} checked={saved} icon={<FavoriteBorder fontSize="large" className="color-medium-teal"/>} checkedIcon={<Favorite fontSize="large" className="color-medium-teal"/>} onClick={handleClickSave} />
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
      </Container>
      <Container style={{margin: '0% 15%', width: 'auto'}}>
        <div className="pt-4 pb-4 d-flex">
          <Col className="align-self-center">
            <div className="text-start">
              <Typography variant="title" className="color-dark-teal">{dest.country}</Typography>
              <Typography variant="bodyText" style={{textAlign: "start"}}>Last updated on {dest.lastUpdate} </Typography>
            </div>
          </Col>
          <div class="d-flex justify-content-end flex-end">
            <NavLink to="" style={linkStyle}>
              <DestinationTabs active={window.location.pathname.endsWith(code)} name="Overview">Overview</DestinationTabs>
            </NavLink>
            <NavLink to="travel" style={linkStyle}>
              <DestinationTabs active={window.location.pathname.endsWith('/travel')} name="Travel">Travel</DestinationTabs>
            </NavLink>
            <NavLink to="covid" style={linkStyle}>
              <DestinationTabs active={window.location.pathname.endsWith('/covid')} name="Diseases">Diseases</DestinationTabs>
            </NavLink>
            <NavLink to="book" style={linkStyle}>
              <DestinationTabs active={window.location.pathname.endsWith('/book')} name="Book">Book</DestinationTabs>
            </NavLink>
          </div>
        </div>
      </Container>
      <Outlet></Outlet>
    </div>
  )
}

export default Destination