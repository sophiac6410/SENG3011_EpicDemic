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
import React, { useState, useEffect } from "react";
import { GetActivities, GetActivityByIds } from '../../adapters/activityAPI';
import { useNavigate } from 'react-router';
import { TailSpin } from "react-loader-spinner"
import { deleteTripCity, getActivityByCity } from "../../adapters/tripAPI";

import ChecklistModal from "./ChecklistModal";
import { Check } from "@mui/icons-material";
import { getTripCityById } from './tripApiCalls';
import ActivityModal from "./ActivityModal";

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

function TripCard({name, tripId, latitude, longitude, city, country, cityId, update}) {
  //City's Activities
  const [activity, setActivity] = React.useState([])
  //User's Activities in this city
  const [savedActivity, setSave] = React.useState([])
  const [savedId, setSavedId] = React.useState([]) 
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate();
  
  const goToTravel = () => {
    navigate(`/destination/${country}/travel`)
  }
  const getSavedActivities = async function () {
    setLoading(true)
    console.log("here")
    if(city.activities) {
      setSavedId(city.activities)
      var {out, controller} = GetActivityByIds({ids: city.activities.toString()})
      out.then(res => {
        console.log(res)
        if(res.status == 200){
          setSave(res.data); // dispatching data to components state
          setLoading(false)
        }
      }).catch(err => {
        console.log(err)
        setLoading(false)
      });
    }
  }
  const removeCity = async function() {
    deleteTripCity(tripId, cityId)
    update()
  }
  const updateActivity = async function() {
    setLoading(true)
    var fetchActivity =  getActivityByCity(tripId, cityId)
    fetchActivity.then(res => {
      var ids = res.data.ids
      setSavedId(ids)
      console.log("new list:" + ids)
      var {out, controller} = GetActivityByIds({ids: ids.toString()})
      out.then(response => {
        console.log(response)
        if(response.status == 200){
          console.log(response.data)
          setSave(response.data); // dispatching data to components state
          setLoading(false)
        }else{
          console.log(res.data)
          setLoading(false)
        }
      }).catch(err => {
        console.log(err)
        setLoading(false)
      });
      // }
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }
  useEffect(() => {
    async function getCityActivities() {
      // setLoading(true)
      var {out, controller} = await GetActivities({lat: city.latitude, lot: city.longitude})
      out.then(res => {
        console.log(res.data)
        setActivity(res.data); // dispatching data to components state
      }).catch(err => {
        console.log(err)
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
          <IconButton onClick={removeCity}>
            <DeleteOutline color="teal"></DeleteOutline>
          </IconButton>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-start align-items-center">
        <IconButton sx={{paddingLeft: "0"}}>
          <AddCircleIcon color="teal"></AddCircleIcon>
        </IconButton>
        <Typography variant='caption' className='color-medium-teal me-3'>Add dates</Typography>
        <ActivityModal fromTrip={true} activities={activity} tripId={tripId} city={city} updateActivity={updateActivity} savedActivity={savedId} cId={city.id}></ActivityModal>
        <IconButton sx={{paddingRight: "5px"}}>
          <FlightIcon sx={{marginRight: "5px"}} color='teal'></FlightIcon>
        </IconButton>
        <Typography variant='caption' className='color-medium-teal' sx={{cursor: 'pointer'}}>Book flights</Typography>
        <ChecklistModal city={city} tripId={tripId}/>
      </div>
      <div className="d-flex flex-row mt-3">
        <Typography variant="heading3" class="color-grey">YOUR BUCKETLIST</Typography>
      </div>
      {
        loading == false ? (
            savedActivity.length == 0 ? (
              <Typography variant='caption' className='color-medium-teal'>Add Some Activity</Typography>
              ):(
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
              {
                savedActivity.map((activity) => 
                <BucketCard activity={activity} key={activity.id}></BucketCard>)
              }
            </Carousel>
            )
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