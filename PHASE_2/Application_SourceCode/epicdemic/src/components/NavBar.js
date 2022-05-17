import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';
import FlightIcon from '@mui/icons-material/Flight';
import { Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { Context, useContext } from '../context';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

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
            left: '58%',
          }}
        />
        <Typography
          variant="bodySmall"
          className="color-white"
          sx={{
            zIndex: 3,
            position: 'relative',
            float: 'left',
            left: '45%',
            bottom: '3px'
          }}
        >
          1
        </Typography>
      </>
    }
    <FavoriteIcon sx={{ color: "white", fontSize: 30, display:'block', mx: 'auto', position: 'relative', right: '10%'}} />
    </div>
  )
}
function NavbarComp(props) {
  NavbarComp.propTypes = {bg: PropTypes.bool};
  const bgColor = props.bg ? '#0F83A0' : 'none';
  const { getters, setters } = useContext(Context);

  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAnchorEl(null);
    setters.setLoggedIn(false);
  }

  return (
      <Navbar className='justify-content-center' variant="dark" style={{zIndex: 2, width: '100vw', background: bgColor}}>
        <Container style={{margin: '1% 0% 0%'}}>
          <div className="d-flex">
          <Navbar.Brand href="/">
            <Typography variant="heading3">EPICDEMIC</Typography>
          </Navbar.Brand>
          <div className="d-flex justify-content-start p-1">
              <Nav>
                <Nav.Link href="/" name="home" className="mx-1">
                  <Typography variant='bodyHeading' sx={{color: 'white'}}>HOME</Typography>
                </Nav.Link>
                <Nav.Link href="/finder" name="destination" className="mx-1">
                  <Typography variant='bodyHeading' sx={{color: 'white'}}>DESTINATIONS</Typography>
                </Nav.Link>
                <Nav.Link href="/planner" name="trip" className="mx-1">
                  <Typography variant='bodyHeading' sx={{color: 'white'}}>PLAN YOUR TRIP</Typography>
                </Nav.Link>
              </Nav>
          </div> 
          </div>
          <div className="d-flex justify-content-end">
            {getters.loggedIn 
            ? (
              <Nav>
                <Nav.Link href="/saved" name="updates" className="mx-1">
                  <Notification updateNum={ props.updateNum }/>
                  <Typography variant="caption" sx={{color: "white"}}>Saved Locations</Typography>
                </Nav.Link>
       
                <Nav.Link href="/planner" name="saved-trips" className="mx-1">
                  <FlightIcon sx={{ color: "white", fontSize: 30, display:'block', mx: 'auto'}} />
                  <Typography variant="caption" sx={{color: "white"}}>Saved Trips</Typography>
                </Nav.Link>
                <Nav.Link name="profile" className="mx-1" aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                  <AccountCircleIcon sx={{ color: "white", fontSize: 30, display:'block', mx: 'auto'}} />
                  <Typography variant="caption" sx={{color: "white"}}>Profile</Typography>
                </Nav.Link>
                
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem href="/" onClick={handleLogout}>Logout</MenuItem>
                </Menu>
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