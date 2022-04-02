import { Container, Row, Col } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import TinySearch from "../components/TinySearch"
import '../styles/Destination.css'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import midCaution from "../static/mid-caution.svg"
import midDot from "../static/mid-dot.svg"
import heart from "../static/solidHeart.png"
import info from "../static/info.svg"



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
  },
  '&:active': {
    backgroundColor: "#62B6CB",
    color: "white",
  },
});

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'blue'
};

function Destination() {
  return(
    <Container>
      <Row>
        <Col>
          {/* <TinySearch className="bg-lightblue"></TinySearch> */}
          <Row className="justify-content-end align-items-center mt-2 me-5">
            <Col md={1} className="text-center pt-2">
              <img src={info} width="62px" height="62px"></img>
              <div style={{"font-size": "15px", "color": "#0F83A0"}}>Notifications</div>
            </Col>
            <Col md={1} className="text-center pt-1 ps-6 mt-3">
              <img src={heart} width="34px" height="34px"></img>
              <div className="mt-3" style={{"font-size": "15px", "color": "#0F83A0"}}>Saved</div>
            </Col>
          </Row>
          <Row className="pt-4 pb-4 align-items-center">
            <Col md={4}>
              <div className="title">PHILIPPINES</div>
              <div className="larger-body">No new changes since 25/03/22 </div>
            </Col>
            <Col>
              <Row style={{"justify-content": "space-between"}} className="ps-3 pe-3">
                <Col className="text-center">
                  <Link to="" style={linkStyle}>
                    <ColorButton variant="outlined">Overview
                    </ColorButton>
                  </Link>
                </Col>
                <Col className="text-center">
                  <Link to="travel" style={linkStyle}>
                    <ColorButton variant="outlined">Travel
                    </ColorButton>
                  </Link>
                </Col>
                <Col className="text-center">
                   <Link to="covid" style={linkStyle}>
                    <ColorButton variant="outlined">Diseases
                    </ColorButton>
                  </Link>
                </Col>
                <Col className="text-center"> 
                  <Link to="Book" style={linkStyle}>
                    <ColorButton variant="outlined">Book
                    </ColorButton>
                  </Link>
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
  )
}

export default Destination