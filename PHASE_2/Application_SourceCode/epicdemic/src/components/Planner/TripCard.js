import { Box } from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { TealBotton } from "../../styles/Button";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FlightIcon from '@mui/icons-material/Flight';
import BucketCard from "./BucketCard";
import Carousel from "react-multi-carousel";
import { ActivityModal } from "./PlannerModal";
import React, { useState, useEffect } from "react";
import { GetActivities } from '../../adapters/activityAPI';

const cardStyle = {
  marginTop: "25px",
  flex: "1 1 0",
  alignItems: "center",
  alignSelf: "center",
  flexDirection: "column",
  padding: "30px",
  paddingLeft: "40px",
  paddingBottom: "40px",
  borderRadius: "10px",
  textAlign: "center",
  backgroundColor: "white",
  boxShadow: "1px 3px #888888",
  border: (theme) => `1px solid ${theme.palette.divider}`,
  '& hr': {
    mx: 2,
  },
  '& svg': {
    m: 1.5,
  },
};


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function TripCard({name, tripId, latitude, longitude}) {
  const [activity, setActivity] = React.useState([])

  useEffect(() => {
    async function updateActivity() {
      // setLoading(true)
      var {out, controller} = await GetActivities({lat: city.latitude, lot: city.longitude})
      out.then(res => {
        console.log(res.data)
        setActivity(res.data); // dispatching data to components state
      }).catch(err => {
        console.log(err)
        // setLoading(false)
      });
    }
    updateActivity()
  }, [latitude, longitude])

  return(
    <Box style={cardStyle} sx={{width: "90%"}}>
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <LocationCityIcon color="teal"></LocationCityIcon>
          <Typography variant="bodyHeading" className="color-medium-teal ms-2">{name}</Typography>
        </div>
        <div className="d-flex flex-row">
          <TealBotton>View travel details</TealBotton>
          <IconButton>
            <DeleteOutline color="teal"></DeleteOutline>
          </IconButton>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-start align-items-center">
        <IconButton sx={{paddingLeft: "0"}}>
          <AddCircleIcon color="teal"></AddCircleIcon>
        </IconButton>
        <Typography variant='caption' className='color-medium-teal me-3'>Add dates</Typography>
        <ActivityModal fromTrip={true} activities={activity}></ActivityModal>
        <IconButton sx={{paddingRight: "5px"}}>
          <FlightIcon sx={{marginRight: "5px"}} color='teal'></FlightIcon>
        </IconButton>
        <Typography variant='caption' className='color-medium-teal'>Book flights</Typography>
      </div>
      <div className="d-flex flex-row mt-3">
        <Typography variant="heading3" class="color-grey">YOUR BUCKETLIST</Typography>
      </div>
      {/* <div className="d-flex flex-wrap mt-3 justify-content-even">
        <BucketCard></BucketCard>
        <BucketCard></BucketCard>
        <BucketCard></BucketCard>
        <BucketCard></BucketCard>
      </div> */}
      <Carousel 
        responsive={responsive} 
        // containerClass="location-carousel"
        autoPlay={false}
        arrows={true}
        shouldResetAutoplay={false}
        itemClass="location-card"
        centerMode={true}
        // className="bg-light-teal"
      >
        <BucketCard></BucketCard>
        <BucketCard></BucketCard>
        <BucketCard></BucketCard>
        <BucketCard></BucketCard>
        <BucketCard></BucketCard>
      </Carousel>
    </Box>
  )
}

export default TripCard