import { Navbar, Container } from "react-bootstrap";
import logo from '../static/logo.svg'
import profile from '../static/profile.svg'
import heart from '../static/heart.svg'
import earth from '../static/earth.svg'

import '../styles/App.css'

function NavbarComp() {
  return (
    <Navbar bg="darkpurple" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          EPICDEMIC ADVENTURE  
          <img src={logo} alt="logo" width="60px" height="40px"></img>
        </Navbar.Brand>
        <div className="d-flex justify-content-end pe-1">
          <img className="me-3 ms-3" src={earth} width="35px" height="35px" alt="global page"></img>
          <img className="me-3 ms-3" src={heart} width="35px" height="35px" alt="collection page"></img>
          <img className="me-3 ms-3" src={profile} width="40px" height="40px" alt="profile page"></img>
        </div>
      </Container>
    </Navbar>
  )
}

export default NavbarComp