import { IconButton } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComp from "../components/NavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Typography } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Trip() {
  return(
    <div className="bg-off-white">
      <NavbarComp bg={true}></NavbarComp>
      <Container>
        <IconButton>
          <ArrowBackIosIcon color="darkTeal" fontSize="medium"></ArrowBackIosIcon>
          <Typography variant="bodyText" className="color-dark-teal">Back</Typography>
        </IconButton>
        <Row className="justify-content-center">
          <div className="text-center">
            <Typography variant="title" className="color-dark-teal">Tiana’s Europe Adventures</Typography>
          </div>
          <Row className='align-items-center justify-content-center mt-4 ps-5'>
            <Col md={2} className="align-self-center ms-5">
              <Row className='align-items-center justify-content-end'>
                <Col md={2}>
                  <DateRangeIcon color='teal'></DateRangeIcon>
                </Col>
                <Col className="align-self-center">
                  <Typography variant="bodyText" className='color-medium-teal' style={{textAlign: "start", marginLeft: "5px"}}>23/06/22 - 23/08/22</Typography>
                </Col>
              </Row>
            </Col>
            <Col md={2}>
              <Row className='align-items-center justify-content-start'>
                <Col md={1}>
                  <PeopleOutlineIcon color='teal' ></PeopleOutlineIcon>
                </Col>
                <Col>
                  <Typography variant="bodyText" className='color-medium-teal' style={{textAlign: "start", marginLeft: "5px"}}>2 Travellers</Typography>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
        <Typography variant="heading1" style={{marginTop: "80px"}}>Destinations</Typography>
      </Container>
    </div>
  )
}

export default Trip