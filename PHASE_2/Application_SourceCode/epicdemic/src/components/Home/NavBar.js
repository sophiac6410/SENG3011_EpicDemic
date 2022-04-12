import { Navbar, Container } from "react-bootstrap";
import logo from '../../static/logo.svg'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

// import '../App.css'

function NavbarComp() {
  return (
    <Navbar variant="dark">
      <Container>
        <Navbar.Brand href="/">
          EPICDEMIC  
          <img src={logo} alt="logo" width="60px" height="40px"></img>
        </Navbar.Brand>
        <div className="d-flex justify-content-end pe-4">
          <NotificationsActiveIcon sx={{ color: "white", fontSize: "40px"}} className="me-3 ms-3"></NotificationsActiveIcon>
          <div href="/saved" name="saved">
            <FavoriteIcon sx={{ color: "white", fontSize: "40px"}} className="ms-2 me-3"></FavoriteIcon>
          </div>
          <AccountCircleIcon sx={{ color: "white", fontSize: "40px"}} className="ms-2"></AccountCircleIcon>
        </div>
      </Container>
    </Navbar>
  )
}

export default NavbarComp