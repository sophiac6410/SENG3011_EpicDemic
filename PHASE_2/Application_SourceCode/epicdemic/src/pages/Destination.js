import { Container, Row, Col } from "react-bootstrap"
import { NavLink, Outlet, useParams } from "react-router-dom"
import '../styles/Destination.css'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import heart from "../static/solidHeart.png"
import info from "../static/bell.svg"
import { NoEncryption } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Typography from '@mui/material/Typography'
import NavbarComp from "../components/NavBar";
import API_URL from "../config.json"

import React, { useState, useEffect } from "react";
import Footer from "../components/Footer"

const ColorButton = styled(Button)({
  fontSize: 20,
  padding: "10px 25px",
  color: "#62B6CB",
  border: '3px solid',
  fontWeight: "bold",
  "border-radius": "30px",
  textTransform: 'none',
  '&:hover': {
    backgroundColor: "#62B6CB",
    color: "white",
    border: 'none'
  },
  '&:active': {
    backgroundColor: "#62B6CB",
    color: "white",
    border: 'none'
  },
});

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'blue'
};

function Destination() {
  const [dest, setDest] = useState(null);
  const [saved, setSaved] = useState(false);
  const { code } = useParams();

  useEffect(() => {
    if (code === null) return;
    // Get the country and code
    // TODO: Dummy data (Need to call an endpoint)
    const country = "PHILLIPINES"; // For now
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
      <Container>
        <Row>
          <Col>
            {/* <TinySearch className="bg-lightblue"></TinySearch> */}
            <Row className="justify-content-end align-items-center mt-2 me-5">
              <Col md={1} className="text-center pt-2">
                <Checkbox icon={<NotificationsNoneIcon fontSize="large"/>} checkedIcon={<NotificationsActiveIcon fontSize="large" className="color-medium-teal"/>} />
                <div style={{"font-size": "15px", "color": "#0F83A0"}}>Notifications</div>
              </Col>
              <Col md={1} className="text-center pt-2">
                <Checkbox icon={<FavoriteBorder fontSize="large"/>} checkedIcon={<Favorite fontSize="large" className="color-medium-teal"/>} onClick={handleClickSave} />
                <div style={{"font-size": "15px", "color": "#0F83A0"}}>Saved</div>
              </Col>
            </Row>
            <Row className="pt-4 pb-4 align-items-center">
              <Col md={4}>
                <Typography variant="heading1" className="color-dark-teal">PHILLIPENES</Typography>
                <div className="larger-body">No new changes since 25/03/22 </div>
              </Col>
              <Col>
                <Row style={{"justify-content": "space-between"}} className="ps-3 pe-3">
                  <Col className="text-center">
                    <NavLink to="" style={linkStyle}>
                      <ColorButton component={NavLink} to="" variant="outlined">Overview</ColorButton>
                    </NavLink>
                  </Col>
                  <Col className="text-center">
                    <NavLink to="travel" style={linkStyle}>
                      <ColorButton variant="outlined">Travel
                      </ColorButton>
                    </NavLink>
                  </Col>
                  <Col className="text-center">
                    <NavLink to="covid" style={linkStyle}>
                      <ColorButton variant="outlined">Diseases
                      </ColorButton>
                    </NavLink>
                  </Col>
                  <Col className="text-center"> 
                    <NavLink to="Book" style={linkStyle}>
                      <ColorButton variant="outlined">Book
                      </ColorButton>
                    </NavLink>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Outlet></Outlet>
        </Row>
      </Container>
    </div>
  )
}

export default Destination