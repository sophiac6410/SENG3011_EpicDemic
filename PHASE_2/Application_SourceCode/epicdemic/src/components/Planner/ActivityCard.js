import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { TealBotton } from "../../styles/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addActivityToCity, addCityToTrip } from "../../adapters/tripAPI";

function ActivityCard({activity, tripId, city, country, isSave, updateCityId, cityId}) {
  const [isActivitySaved, saveActivity] = React.useState(isSave)
  const handleSave = () => {
    saveActivity(!isActivitySaved)
  }
  useEffect(()=>{
    async function saveActivity(){
      if(isActivitySaved){
        // if(city.id) {
        //   const response = await addActivityToCity(Number(activity.id), city.id, Number(tripId), activity.name)
        //   console.log("add activity" + activity.id + "to" + city.id)
        // }else 
        if(cityId){
            const response = await addActivityToCity(Number(activity.id), cityId, Number(tripId), activity.name)
            console.log("add activity" + activity.id + "to" + cityId)
          }else{
            const data = await addCityToTrip(tripId, city.name, city.latitude, city.longitude, country.code, country.name);
            updateCityId(data.id)
            console.log(data.id)
            const response = await addActivityToCity(Number(activity.id), data.id, Number(tripId), activity.name)
            console.log("add activity" + activity.id + "to" + data.id)
          }
      }else{
        //TODO
        console.log("unsave activity")
      }
    }
    saveActivity()
  }, [isActivitySaved])

  return(
    <div className="border-radius-med flex-column m-2 col-3 bg-light-blue" style={{width: 'auto', maxHeight: "700px", overflow: "auto"}}>
      <div>
        <img src={activity.pictures[0]} width="100%" height="300px"></img>
      </div>
      <div className="bg-light-grey d-flex flex-column p-3 text-start">
        <Typography variant="bodyImportant" className="color-medium-teal ms-2">{activity.name}</Typography>
        <div className="d-flex flex-row justify-content-between mt-1 align-items-center">
          <div className="d-flex flex-row ms-2 align-items-center">
            <Typography variant="bodyText" className="color-dark-teal me-3" sx={{fontWeight: 700}}>Rating</Typography>
            {/* <StarIcon color="darkTeal" fontSize="15px"></StarIcon>
            <StarIcon color="darkTeal" fontSize="15px"></StarIcon>
            <StarIcon color="darkTeal" fontSize="15px"></StarIcon> */}
            {
              activity.rating ? (
                <Typography variant="bodyImportant" className="color-dark-teal me-3" sx={{fontWeight: 700}}>{Math.round((activity.rating) * 100) / 100}</Typography>
              ): (
                <Typography variant="bodyText" className="color-dark-teal me-3">Not Available</Typography>
              )
            }
          </div>
          <Typography variant="bodyText" className="color-dark-teal" sx={{fontWeight: 700}}>${activity.price.amount} EUR</Typography>
        </div>
        <Typography variant="bodyText" className="color-dark-grey ms-2 mt-2" style={{maxHeight: "150px", overflow:"hidden"}}>{activity.shortDescription}</Typography>
        <div className="d-flex flex-row justify-content-between mt-1">
          {/* <Button color="darkTeal">BOOK</Button>
          <Button color="darkTeal">REMOVE</Button> */}
          <div className="justify-content-end">
            <TealBotton className="mt-4 mb-4 ms-2" href={activity.bookingLink}>Book</TealBotton>
          </div>
          <div className="justify-content-end mt-4">
            <IconButton className="d-flex flex-column" onClick={handleSave}>
              {
                isActivitySaved ? (
                  <FavoriteIcon color="teal"></FavoriteIcon>
                ) : (
                  <FavoriteBorderIcon color="teal"></FavoriteBorderIcon>
                )
              }
              <Typography variant="bodySmall" className="color-medium-teal">Save to bucketlist</Typography>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard