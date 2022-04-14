import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';
import { Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { Context, useContext } from '../context';
import Button from '@mui/material/Button';

function Notification (props) {
  return (
    <div style={{margin: '0px auto'}}>
    { props.updateNum !== 0
      && <>
        <CircleIcon
          className="color-dark-teal"
          sx={{
            position: 'relative',
            float: 'left',
            fontSize: 20,
            zIndex: 2, 
            left: '45%',
          }}
        />
        <Typography
          variant="bodySmall"
          className="color-white"
          sx={{
            zIndex: 3,
            position: 'relative',
            float: 'left',
            left: '24%',
            bottom: '3px'
          }}
        >
          1
        </Typography>
      </>
    }
    <NotificationsIcon
      sx={{
        color: "white",
        fontSize: 30,
        display:'block',
        mx: 'auto',
        position: 'relative',
        right: '30%'
      }}
    />
    </div>
  )
}
function NavbarComp(props) {
  NavbarComp.propTypes = {bg: PropTypes.bool};
  const bgColor = props.bg ? '#0F83A0' : 'none';
  const { getters } = useContext(Context);
  return (
      <Navbar className='justify-content-center' variant="dark" style={{zIndex: 2, width: '100vw', background: bgColor}}>
        <Container style={{margin: '1% 10% 0%'}}>
          <Navbar.Brand href="/">
            <Typography variant="heading3">EPICDEMIC</Typography>
          </Navbar.Brand>
          <div className="d-flex justify-content-end pe-4">
            {getters.loggedIn 
            ? (
              <Nav>
                <Nav.Link href="/saved" name="updates" className="mx-3">
                  <Notification updateNum={ props.updateNum }/>
                  <Typography variant="caption" sx={{color: "white"}}>Updates</Typography>
                </Nav.Link>
                <Nav.Link href="/saved" name="saved" className="mx-3">
                  <FavoriteIcon sx={{ color: "white", fontSize: 30, display:'block', mx: 'auto'}}></FavoriteIcon>
                  <Typography variant="caption" sx={{color: "white"}}>Saved Trips</Typography>
                </Nav.Link>
                <Nav.Link href="/" name="profile" className="mx-3">
                  <AccountCircleIcon sx={{ color: "white", fontSize: 30, display:'block', mx: 'auto'}}></AccountCircleIcon>
                  <Typography variant="caption" sx={{color: "white"}}>Profile</Typography>
                </Nav.Link>
              </Nav>
            )
            : (
              <Nav>
                <Nav.Link href="/login" name="login-button" className="mx-3">
                  <Typography variant="bodyImportant" sx={{color: "white"}}>Login</Typography>
                </Nav.Link>
                <Nav.Link href="/register" name="register-button" className="mx-3">
                  <Typography variant="bodyImportant" sx={{color: "white"}}>Sign Up</Typography>
                </Nav.Link>
              </Nav>
            )
            }
          </div>
        </Container>
      </Navbar>
  )
}

export default NavbarComp