import { Container, Row, Col } from "react-bootstrap"
import { NavLink, Outlet, useParams, useLocation } from "react-router-dom"
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
import NavbarComp from "../components/Navbar";

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
  const location = useLocation();

  useEffect(() => {
    if (location.state === null) return;
    // Get the country and code
    setDest({
      country: location.state.country,
      code: location.state.code
    })
  }, [location.key])

  if (dest === null) {
    return (
      <Footer/>
    )
  }

  return(
    <div>
      <NavbarComp></NavbarComp>
      <Container>
        <Row>
          <Col>
            {/* <TinySearch className="bg-lightblue"></TinySearch> */}
            <Row className="justify-content-end align-items-center mt-2 me-5">
              <Col md={1} className="text-center pt-2">
                <Checkbox icon={<NotificationsNoneIcon fontSize="large"/>} checkedIcon={<NotificationsActiveIcon fontSize="large" className="color-medium-teal"/>} onClick={(event)=> {setSaved(event.target.checked)}} />
                <div style={{"font-size": "15px", "color": "#0F83A0"}}>Notifications</div>
              </Col>
              <Col md={1} className="text-center pt-2">
                <Checkbox icon={<FavoriteBorder fontSize="large"/>} checkedIcon={<Favorite fontSize="large" className="color-medium-teal"/>} onClick={(event)=> {setSaved(event.target.checked)}} />
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
            {/* <Row className="p-4 align-items-end">
              <Col md={4}>
                <div style={{"font-size": "20px", "color": "#515151"}}>Overall Advice</div>
                <Row className="align-items-center pt-1 justify-content-start mt-3">
                  <Col md={3}>
                    <Row className="justify-content-center">
                    <img src={midCaution} width="40px" height="40px">
                    </img>
                    </Row>
                  </Col>
                  <Col className="pt-1">
                    <text style={{"font-size": "20px", "color": "#FFA800"}}>Exercise Caution</text>
                  </Col>
              </Row>
              </Col>
              <Col md={4}>
                <div style={{"font-size": "20px", "color": "#515151"}}>Travel Status</div>
                <Row className="align-items-center pt-1 justify-content-start mt-3">
                  <Col md={3} className="justify-content-center">
                    <Row className="justify-content-center">
                      <img src={midDot} width="25px" height="25px">
                      </img>
                    </Row>
                  </Col>
                  <Col className="pt-1">
                    <text style={{"font-size": "20px", "color": "#FFA800"}}>Open with Restrictions</text>
                  </Col>
                </Row>
              </Col>
              <Col md={4} className="text-center pt-1">
                <img src={heart} width="50px" height="50px"></img>
                <div style={{"font-size": "20px", "color": "#0F83A0"}}>Saved</div>
              </Col>
            </Row> */}
          </Col>
          <Outlet></Outlet>
        </Row>
      </Container>
    </div>
  )
}

export default Destination