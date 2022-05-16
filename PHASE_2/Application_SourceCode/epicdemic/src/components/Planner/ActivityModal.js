import { IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Carousel from "react-multi-carousel";
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Navigate, useNavigate } from 'react-router-dom';
import ActivityCard from "./ActivityCard";
import { GetActivityByIds } from "../../adapters/activityAPI";



const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const activityModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "1000px",
  hight: "1000px",
  bgcolor: 'background.paper',
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#EEF0F2",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "80px",
};

function ActivityModal({fromTrip, activities, tripId, city, updateActivity, country, savedActivity}) {
  const [isOpen, setOpen] = React.useState(false);
  //for planner modal
  const [cityId, setCityId] = React.useState(0);
  // const [savedActivity, setSave] = React.useState([])

  const handleOpen = () => {
    setOpen(true);
    setStepThree(false)
  };

  const handleBack = () => {
    setOpen(false)
    setStepThree(false)
    //case 1: from plannermodal set added
    //case 2: from trip page update activity
    updateActivity()
  }
  const [stepThree, setStepThree] = React.useState(false)

  const updateCityId = (cityKey) => {
    setCityId(cityKey)
  }

  const randomGenerator = () => {
    setStepThree(true)
  }

  let navigate = useNavigate()
  const saveTrip = () => {
    navigate(`/trip/${tripId}`)
  }

  const isSave = (aId) => {
    if(savedActivity){
      return savedActivity.includes(Number(aId))
    }
  }
  // const getSavedActivities = async function () {
  //   setSave(city.activities)
  // }
  
  // useEffect(() => {
  //   // getSavedActivities()
  //   return ()=>{
  //     setSave([])
  //   }
  // }, [])

  return(
    <React.Fragment>
      {fromTrip ? (
        <div className='d-flex flex-row align-items-center me-2'>
        <IconButton onClick={handleOpen}>
          <LocalActivityIcon color='teal'></LocalActivityIcon>
        </IconButton>
        <Typography variant='caption' className='color-medium-teal' sx={{cursor: 'pointer'}} onClick={handleOpen}>View activities</Typography>
        </div>
      ): (
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width:"120px"}}>
          <IconButton onClick={handleOpen}>
            <LocalActivityIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></LocalActivityIcon>
          </IconButton>
          <Typography variant='caption' className='color-medium-teal'>View activities</Typography>
        </div>
      )}
      <Modal
        open={isOpen}
      >
        <Box sx={activityModalStyle}>
          <div style={{display: "flex", justifyContent: "end", flexDirection: "row", alignItems: "center", paddingBottom: "20px"}}>
            <IconButton onClick={handleBack}>
              <CloseIcon color='teal' sx={{marginTop: "10px", marginRight: "5px"}} fontSize="small"></CloseIcon>
            </IconButton>
            {/* <Typography variant='body' className='color-medium-teal mt-2'>Back</Typography> */}
          </div>
          <Typography variant="heading2" className='color-dark-teal text-center'>
            Things to do
          </Typography>
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
            {activities.map((activity, id) => {
              if(activity !== null && city !== null) {
                return <ActivityCard key={activity.id} activity={activity} city={city} tripId={tripId} country={country} isSave={isSave(activity.id)} updateCityId={updateCityId} cityId={cityId}></ActivityCard>
              } else {
                return <Typography variant="bodyText">No activities to book here. Maybe just sightseeing?</Typography>
              }
            })}
          </Carousel>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default ActivityModal