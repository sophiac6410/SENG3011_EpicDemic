import { Navbar, Container, Nav } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import '../styles/App.css'
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function NavbarComp(props) {
  NavbarComp.propTypes = { auth: PropTypes.bool }
  return (
    <Navbar bg="darkteal" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          EPICDEMIC  
          <FlightTakeoffIcon sx={{color: 'white', margin: 1}}/>
        </Navbar.Brand>
        <div className="d-flex justify-content-end pe-1">
          {props.auth 
          ? (
            <nav>
              <IconButton aria-label="saved-locations">
                <FavoriteIcon fontSize="large" sx={{color: 'white'}}/>
              </IconButton>
              <IconButton aria-label="profile">
                <AccountCircleIcon fontSize="large" sx={{color: 'white'}}/>
              </IconButton>
            </nav>
          )
          : (
            <nav>
              <Button href="/login" variant="text" sx={{color:'white'}} >Login</Button>
              <Button href="/register" variant="text" sx={{color:'white'}}>Register</Button>
            </nav>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

export default NavbarComp