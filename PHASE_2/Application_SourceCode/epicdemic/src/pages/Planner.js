import React from 'react'
import NavbarComp from "../components/NavBar"
import "./../styles/Planner.css"
import Typography from '@mui/material/Typography'
import { WhiteButton } from "../styles/Button"
import { Container } from "react-bootstrap"
import {StepOne, StepTwo} from '../components/Planner/PlannerModal'

function Planner() {
  const [stepOne, setStepOne] = React.useState(false);
  const [stepTwo, setStepTwo] = React.useState(false);
  const openStepOne = () => setStepOne(true)
  const closeStepOne = () => setStepOne(false)
  const openStepTwo = () => {
    setStepOne(false);
    setStepTwo(true)
  }
  const closeStepTwo = () => setStepTwo(false)
  const saveTrip = () => {console.log("hii")}

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
      <Container className="pt-5">
        <Typography variant="heading2" className="color-dark-teal">Your saved trips</Typography>
      </Container>
    </div>
  )
}

export default Planner;

