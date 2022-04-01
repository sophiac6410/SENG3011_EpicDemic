import { Container, Row, Col } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import TinySearch from "../components/TinySearch"
import '../styles/Destination.css'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import midCaution from "../static/mid-caution.svg"
import midDot from "../static/mid-dot.svg"
import heart from "../static/solidHeart.png"



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

function Destination() {
  return(
    <Container>
      <Row>
        <Col>
          <TinySearch className="bg-lightblue"></TinySearch>
          <Row className="p-4">
            <Col md={4}>
              <h2>PHILIPPINES</h2>
              <div>No new changes since 25/03/22 </div>
            </Col>
            <Col>
              <Row style={{"justify-content": "space-between"}} className="ps-3 pe-3">
                <Col className="text-center">
                  <ColorButton variant="outlined">Overview</ColorButton>
                </Col>
                <Col className="text-center">
                  <ColorButton variant="outlined">Travel</ColorButton>
                </Col>
                <Col className="text-center">
                  <ColorButton variant="outlined">Diseases</ColorButton>
                </Col>
                <Col className="text-center"> 
                  <ColorButton variant="outlined">Book</ColorButton>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="p-4 align-items-end">
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
          </Row>
        </Col>
        <Outlet></Outlet>
      </Row>
    </Container>
  )
}

export default Destination