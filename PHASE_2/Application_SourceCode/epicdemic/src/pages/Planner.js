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
  const [stepOneOpen, setStepOneOpen] = React.useState(false);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [trips, setTrips] = React.useState([])
  const openStepOne = () => setStepOneOpen(true)
  const closeStepOne = () => setStepOneOpen(false)
  const openStepTwo = () => {
    setStepOneOpen(false);
    setStepTwo(true)
  }
  const closeStepTwo = () => setStepTwo(false)
  const saveTrip = () => {console.log("hii")}
  
  useEffect(() => {
    getTrips()
    return () => {
      setTrips([]);
    };
  }, []);

  const getTrips = async () => {
    const data = await getSavedTrips();
    //unauthorized
    if(data == undefined) {
      setTrips([])
    }else{
      setTrips(data)
    }
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
          <StepOne isOpen={stepOneOpen} onClose={closeStepOne} onNext={openStepTwo}></StepOne>
        </div>
      </div>
      <Container className="pt-5 pb-5">
        <Typography variant="heading2" className="color-dark-teal">Your saved trips</Typography>
        <div className='justify-content-center' style={{display: "flex", flexDirection: "column"}}>
          {trips == [] || trips == null ? (
            <div></div>
          ) : (
            Object.keys(trips).map((key, i) => 
              (<SavedCard 
                key={key}
                name={trips[key].name}
                start={trips[key].start_date}
                end={trips[key].end_date}
                travellers={trips[i].travellers}
                tripId={trips[i].id}
                update={getTrips}
              ></SavedCard>)
            )
          )}
        </div>
      </Container>
    </div>
  )
}

export default Planner;

