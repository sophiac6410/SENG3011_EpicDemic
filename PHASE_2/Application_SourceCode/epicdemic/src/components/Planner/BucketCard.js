import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { GetActivity } from "../../adapters/activityAPI";

function BucketCard({activity, loading}) {
  const handleImageError = (e) => {
    e.target.src = "https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408.jpg"
  }

  return(
    <div className="border-radius-med flex-column m-2 col-3" style={{width: 'auto'}}>
      <div>
        {
          activity.pictures == undefined ? (
            <img src="../../static/sky.png" width="100%"></img>
          ):(
            <img src={activity.pictures[0]} width="100%" onError={handleImageError}></img>
          )
        }
      </div>
      <div className="bg-light-grey d-flex flex-column p-3 text-start">
        <Typography variant="bodyImportant" className="color-medium-teal ms-2">{activity.name}</Typography>
        <div className="d-flex flex-row justify-content-between mt-1">
          <Button color="darkTeal" href={activity.bookingLink}>BOOK</Button>
          <Button color="darkTeal">REMOVE</Button>
        </div>
      </div>
    </div>
  )
}

export default BucketCard