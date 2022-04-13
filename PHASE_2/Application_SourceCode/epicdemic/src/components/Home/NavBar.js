import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../../static/logo.svg'
import { IconButton } from "@material-ui/core";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleIcon from '@mui/icons-material/Circle';
import { Typography } from "@mui/material";
import PropTypes from 'prop-types';

function Notification (props) {
  NavbarComp.propTypes = {updateNum: PropTypes.number};
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
            left: '53%',
          }}
        />
        <Typography
          variant="bodySmall"
          className="color-white"
          sx={{
            zIndex: 3,
            position: 'relative',
            float: 'left',
            left: '32%',
            bottom: '3px'
          }}
        >
          {props.updateNum}
        </Typography>
      </>
    }
    <NotificationsIcon
      sx={{
        color: "white",
        fontSize: 35,
        display:'block',
        mx: 'auto',
        position: 'relative',
        right: '20%'
      }}
    />
    </div>
  )
}
function NavbarComp(props) {
  NavbarComp.propTypes = {updateNum: PropTypes.number};
  const [auth, setAuth] = React.useState(localStorage.getItem('token') !== undefined);
  return (
    <Navbar variant="dark">
      <Container style={{margin: '2% auto'}}>
        <Navbar.Brand href="/">
          <Typography variant="heading1">EPICDEMIC</Typography>
        </Navbar.Brand>
        <div className="d-flex justify-content-end pe-4">
          {auth 
          ? (
            <Nav>
              <Nav.Link href="/saved" name="saved" className="mx-3">
                <Notification updateNum={ props.updateNum }/>
                <Typography variant="bodyText" sx={{color: "white"}}>Updates</Typography>
              </Nav.Link>
              <Nav.Link href="/saved" name="saved" className="mx-3">
                <FavoriteIcon sx={{ color: "white", fontSize: 35, display:'block', mx: 'auto'}}></FavoriteIcon>
                <Typography variant="bodyText" sx={{color: "white"}}>Saved Trips</Typography>
              </Nav.Link>
              <Nav.Link href="/saved" name="saved" className="mx-3">
                <AccountCircleIcon sx={{ color: "white", fontSize: 35, display:'block', mx: 'auto'}}></AccountCircleIcon>
                <Typography variant="bodyText" sx={{color: "white"}}>Profile</Typography>
              </Nav.Link>
            </Nav>
          )
          : (
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