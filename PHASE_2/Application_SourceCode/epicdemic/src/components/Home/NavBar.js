import { Navbar, Container, Nav } from "react-bootstrap";
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
        </div>
      </Container>
    </Navbar>
  )
}

export default NavbarComp