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
import { GetActivities, GetActivityByIds } from '../../adapters/activityAPI';
import { useNavigate } from 'react-router';
import { TailSpin } from "react-loader-spinner"
import ChecklistModal from "./ChecklistModal";
import { Check } from "@mui/icons-material";
import { getTripCityById } from './tripApiCalls';

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

function TripCard({name, tripId, latitude, longitude, city, country}) {
  //City's Activities
  const [activity, setActivity] = React.useState([])
  //User's Activities in this city
  const [savedActivity, setSave] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate();
  
  const goToTravel = () => {
    navigate(`/destination/${country}/travel`)
  }

  useEffect(() => {
    async function getCityActivities() {
      // setLoading(true)
      var {out, controller} = GetActivities({lat: city.latitude, lot: city.longitude})
      out.then(res => {
        console.log(res.data)
        setActivity(res.data); // dispatching data to components state
      }).catch(err => {
        console.log(err)
      });
    }
    async function getSavedActivities() {
      const data = await getTripCityById(tripId, city.id);
      console.log(data);

      var {out, controller} = GetActivityByIds({ids: data.activities.toString()})
      out.then(res => {
        console.log(res)
        if(res.status == 200){
          console.log(res.data)
          setSave(res.data); // dispatching data to components state
          setLoading(false)
        }
      }).catch(err => {
        console.log(err)
        setLoading(false)
      });
    }
    getSavedActivities()
    getCityActivities()
    return () => {
      setActivity([])
    }
  }, [city])


  return(
    <Box style={cardStyle} sx={{width: "90%"}}>
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <LocationCityIcon color="teal"></LocationCityIcon>
          <Typography variant="bodyHeading" className="color-medium-teal ms-2">{name}</Typography>
        </div>
        <div className="d-flex flex-row">
          <TealBotton onClick={goToTravel}>View travel details</TealBotton>
          <IconButton>
            <DeleteOutline color="teal"></DeleteOutline>
          </IconButton>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-start align-items-center">
        <IconButton sx={{paddingLeft: "0"}}>
          <AddCircleIcon color="teal"></AddCircleIcon>
        </IconButton>
        <Typography variant='caption' className='color-medium-teal me-3' sx={{cursor: 'pointer'}}>Add dates</Typography>
        <ActivityModal fromTrip={true} activities={activity} tripId={tripId} city={city}></ActivityModal>
        <IconButton sx={{paddingRight: "5px"}}>
          <FlightIcon sx={{marginRight: "5px"}} color='teal'></FlightIcon>
        </IconButton>
        <Typography variant='caption' className='color-medium-teal' sx={{cursor: 'pointer'}}>Book flights</Typography>
        <ChecklistModal city={city} tripId={tripId}/>
      </div>
      <div className="d-flex flex-row mt-3">
        <Typography variant="heading3" class="color-grey">YOUR BUCKETLIST</Typography>
      </div>
      { savedActivity.length == 0
        ? <Typography variant='caption' className='color-medium-teal justify-content-start d-flex'>No activities yet</Typography>
        : loading == false ? (
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
            {savedActivity.map((activity) => 
                <BucketCard activity={activity} key={activity.id}></BucketCard>)
            }
          </Carousel>
        ):(
          <div style={{display: "flex"}} className="flex-row justify-content-center">
            <TailSpin color='#70C4E8' style={{}}></TailSpin>
          </div>
        )
      }
    </Box>
  )
}

export default TripCard