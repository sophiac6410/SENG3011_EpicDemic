import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { GetActivity } from "../../adapters/activityAPI";

function BucketCard({id}) {
  const [data, setData] = useState(null)

  useEffect(()=> {
    var {out, controller} = GetActivity({id: id})
    out.then(res => {
      console.log(res.data)
      setData(res.data); // dispatching data to components state
    }).catch(err => {
      console.log(err)
    });
  },[id])

  if(data == null) {
    return(
      <div/>
    )
  }
  return(
    <div className="border-radius-med flex-column m-2 col-3" style={{width: 'auto'}}>
      <div>
        <img src={data.pictures[0]} width="100%"></img>
      </div>
      <div className="bg-light-grey d-flex flex-column p-3 text-start">
        <Typography variant="bodyImportant" className="color-medium-teal ms-2">{data.name}</Typography>
        <div className="d-flex flex-row justify-content-between mt-1">
          <Button color="darkTeal" href={data.bookingLink}>BOOK</Button>
          <Button color="darkTeal">REMOVE</Button>
        </div>
      </div>
    </div>
  )
}

export default BucketCard