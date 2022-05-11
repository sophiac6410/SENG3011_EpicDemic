import { IconButton } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComp from "../components/NavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Typography } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TripCard from "../components/Planner/TripCard";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import { getTripById } from '../adapters/tripAPI';
import React, { useEffect } from 'react';
import {AddMember} from '../components/Planner/PlannerModal'

function Trip() {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [name, setName] = React.useState("")
  const [dates, setDates] = React.useState("")
  const [travellers, setTravellers] = React.useState(0)
  const [cities, setCities] = React.useState([])
  const [activities, setActivities] = React.useState([])
  const [data, setData] = React.useState([])
  const [openAdd, setAdd] = React.useState(false);
  const openAddModal = () => setAdd(true)
  const closeAddModal = () => setAdd(false)

  // useEffect(() => {
  //   async function fetchTrip () {
  //     console.log(tripId);
  //     const data = await getTripById(tripId);
  //     console.log(data)
  //     setName(data.name)
  //     const date1 = new Date(data.start_date);
  //     const date2 = new Date(data.end_date);
  //     setDates(date1.getDate() + '/' + (date1.getMonth() + 1) + '/' + date1.getFullYear() + " - " + date2.getDate() + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear())
  //     setTravellers(data.travellers)
  //     setCities(data.cities)
  //   }
  //   fetchTrip();
  // }, []);

  useEffect(() => {
    async function getTrip() {
      const data = await getTripById(tripId);
      console.log(data)
      setName(data.name)
      const date1 = new Date(data.start_date);
      const date2 = new Date(data.end_date);
      setDates(date1.getDate() + '/' + (date1.getMonth() + 1) + '/' + date1.getFullYear() + " - " + date2.getDate() + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear())
      setTravellers(data.travellers)
      setCities(data.cities)
      setActivities(data.activities)
    }
    getTrip()
  },[tripId])

  // useEffect(()=>{
  //   // setName(data.name)
  //   // const date1 = new Date(data.start_date);
  //   // const date2 = new Date(data.end_date);
  //   // setDates(date1.getDate() + '/' + (date1.getMonth() + 1) + '/' + date1.getFullYear() + " - " + date2.getDate() + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear())
  //   // setTravellers(data.travellers)
  //   // setCities(data.cities)
  //   async function getBucket() {

  //   }
  //   getBucket
  // }, [data])


  return(
    <div className="bg-off-white" style={{paddingBottom: "200px"}}>
      <NavbarComp bg={true}></NavbarComp>
      <Container>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon color="darkTeal" fontSize="medium"></ArrowBackIosIcon>
          <Typography variant="bodyText" className="color-dark-teal">Back</Typography>
        </IconButton>
        <Row className="justify-content-center">
          <div className="text-center mt-5">
            <Typography variant="title" className="color-dark-teal">{name}</Typography>
          </div>
          <Row className='align-items-center justify-content-center mt-4 ps-5'>
            <Col md={2} className="align-self-center ms-5">
              <Row className='align-items-center justify-content-end'>
                <Col md={2}>
                  <DateRangeIcon color='teal'></DateRangeIcon>
                </Col>
                <Col className="align-self-center">
                  <Typography variant="bodyText" className='color-medium-teal' style={{textAlign: "start", marginLeft: "5px"}}>{dates}</Typography>
                </Col>
              </Row>
            </Col>
            <Col md={2}>
              <Row className='align-items-center justify-content-start'>
                <Col md={1}>
                  <PeopleOutlineIcon color='teal' onClick={openAddModal}></PeopleOutlineIcon>
                </Col>
                <Col>
                  <Typography variant="bodyText" className='color-medium-teal' style={{textAlign: "start", marginLeft: "5px"}}>{travellers} Travellers</Typography>
                </Col>
              </Row>
            </Col>
            <Col md={2}>
              <Row>
                <Col md={1}>
                  <PeopleOutlineIcon color='teal' onClick={openAddModal}></PeopleOutlineIcon>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
        <AddMember isOpen={openAdd} onClose={closeAddModal}></AddMember>
        <Typography variant="heading1" style={{marginTop: "60px", marginLeft: "70px"}}>Destinations</Typography>
        <div className='justify-content-center' style={{display: "flex", flexDirection: "column"}}>
        {Object.keys(cities).map((key, i) => 
            (<TripCard 
              key={key}
              name={cities[key].city_name + ", " + cities[key].country_name}
              latitude={cities[key].latitude}
              longitude={cities[key].longitude}
              activities={cities[key].activities}
              tripId={tripId}
              country={cities[key].country_code}
              city={cities[key]}
            ></TripCard>)
          )}
        </div>
        <div className="mt-5 flex-row d-flex justify-content-center align-items-center">
          <IconButton>
            <AddCircleIcon color="teal" fontSize="large"></AddCircleIcon>
          </IconButton>
          <Typography variant="bodyText" className="color-medium-teal">Add City</Typography>
        </div>
      </Container>
    </div>
  )
}

export default Trip