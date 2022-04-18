import React, { useEffect } from 'react'
import NavbarComp from "../components/NavBar"
import "./../styles/Planner.css"
import Typography from '@mui/material/Typography'
import { WhiteButton } from "../styles/Button"
import { Container, Row } from "react-bootstrap"
import {StepOne, StepTwo} from '../components/Planner/PlannerModal'
import SavedCard from '../components/Planner/SavedCard'
import { getSavedTrips, deleteTrip } from '../components/Planner/tripApiCalls'

function Planner() {
  const [stepOne, setStepOne] = React.useState(false);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [trips, setTrips] = React.useState([])
  const openStepOne = () => setStepOne(true)
  const closeStepOne = () => setStepOne(false)
  const openStepTwo = () => {
    setStepOne(false);
    setStepTwo(true)
  }
  const closeStepTwo = () => setStepTwo(false)
  const saveTrip = () => {console.log("hii")}
  
  useEffect(() => {
    getTrips()
  }, []);

  const getTrips = async () => {
    const data = await getSavedTrips();
    console.log(data)
    // setTrips(data.data)
    setTrips([{ 
      "id": 1,
      "name": "Europe Adventures", 
      "start_date": "2022-06-01T00:00:00.000+00:00",
      "end_date": "2022-08-07T00:00:00.000+00:00",
      "travellers": "4",
    }, 
    { 
      "id": 2,
      "name": "Australian Roadtrip", 
      "start_date": "2022-06-01T00:00:00.000+00:00",
      "end_date": "2022-08-07T00:00:00.000+00:00",
      "travellers": "2",
    }, 
    { 
      "id": 3,
      "name": "Family holiday", 
      "start_date": "2022-06-01T00:00:00.000+00:00",
      "end_date": "2022-08-07T00:00:00.000+00:00",
      "travellers": "6",
    },
  ])
  }

  return(
    <div style={{backgroundColor: "#F4FBFF"}}>
      <div className="bg-planner" style={{paddingBottom: "130px"}}>
        <NavbarComp bg={false}></NavbarComp>
        <div className="text-center mt-5">
          <Typography variant="title" className="color-white mt-5">Start planning your trip</Typography>
        </div>
        <div className="text-center mt-3">
          <Typography variant="caption" className="color-white mt-5">Our trip planner will recommend countries, cities and activities taking into consideration your travel preferences.</Typography>
        </div>
        <div className="text-center mt-5">
          <WhiteButton onClick={openStepOne}>
            <Typography variant="bodyImportant" className="me-5 ms-5">Plan a new trip</Typography>
          </WhiteButton>
          <StepOne isOpen={stepOne} onClose={closeStepOne} onNext={openStepTwo}></StepOne>
          {/* <StepTwo isOpen={stepTwo} onClose={closeStepTwo} onSave={saveTrip}></StepTwo> */}
        </div>
      </div>
      <Container className="pt-5 pb-5">
        <Typography variant="heading2" className="color-dark-teal">Your saved trips</Typography>
        <div className='justify-content-center' style={{display: "flex", flexDirection: "column"}}>
          {Object.keys(trips).map((key, i) => 
            (<SavedCard 
              key={key}
              name={trips[key].name}
              start={trips[key].start_date}
              end={trips[key].end_date}
              travellers={trips[i].travellers}
              tripId={trips[i].id}
            ></SavedCard>)
          )}
        </div>
      </Container>
    </div>
  )
}

export default Planner;

