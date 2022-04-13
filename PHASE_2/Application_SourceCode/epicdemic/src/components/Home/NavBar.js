import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../../static/logo.svg'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

// import '../App.css'

function NavbarComp() {
  const auth = true;
  return (
    <Navbar variant="dark">
      <Container>
        <Navbar.Brand href="/">
          EPICDEMIC  
          <img src={logo} alt="logo" width="60px" height="40px"></img>
        </Navbar.Brand>
        <div className="d-flex justify-content-end pe-4">
          {auth ? 
          (
            <Nav>
              <Nav.Link href="/saved" name="saved">
                <NotificationsActiveIcon sx={{ color: "white", fontSize: "40px"}} className="me-3 ms-3"></NotificationsActiveIcon>
              </Nav.Link>
              <Nav.Link href="/saved" name="saved">
                <FavoriteIcon sx={{ color: "white", fontSize: "40px"}} className="ms-2 me-3"></FavoriteIcon>
              </Nav.Link>
              <Nav.Link href="/saved" name="saved">
                <AccountCircleIcon sx={{ color: "white", fontSize: "40px"}} className="ms-2"></AccountCircleIcon>
              </Nav.Link>
            </Nav>
          ) : (
            <nav>
                <Button href="/login" variant="text" sx={{color:'white'}} >Login</Button>
                <Button href="/register" variant="text" sx={{color:'white'}}>Register</Button>
            </nav>
          )
        }
        </div>
      </Container>
    </Navbar>
  )
}

export default NavbarComp