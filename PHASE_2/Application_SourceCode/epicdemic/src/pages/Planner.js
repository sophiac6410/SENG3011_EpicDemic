import React, { useEffect } from 'react'
import NavbarComp from "../components/NavBar"
import "./../styles/Planner.css"
import Typography from '@mui/material/Typography'
import { WhiteButton, DarkButton } from "../styles/Button"
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
          <Typography variant="caption" className="color-white mt-5">Our trip planner will recommend and showcase countries, cities and activities taking into consideration your travel preferences.</Typography>
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: '50px'}}>
          <WhiteButton onClick={openStepOne} className="align-self-center pt-2 pb-2" style={{width: "200px"}}>  
            <Typography variant="bodyHeading">Plan a new trip</Typography>
          </WhiteButton>
          <DarkButton className="align-self-center ms-4 pt-2 pb-2" style={{width: "250px"}}>
            <Typography variant="bodyHeading">Adjust my travel preferences</Typography>
          </DarkButton>
          <StepOne isOpen={stepOneOpen} onClose={closeStepOne} onNext={openStepTwo}></StepOne>
        </div>
      </div>
      <Container className="pt-5 pb-5">
        <Typography variant="heading2" className="color-dark-teal">Your saved trips</Typography>
        <Typography variant="caption" className='color-dark-teal'>Click the 'Plan a new trip' button above to create a new trip. You may edit or remove trips at any time. If you enjoyed your trip, click the heart icon, this will be used in combination with your trip preferences to help us recommend appropriate cities for you.</Typography>
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