import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import FormControl, { useFormControl } from '@mui/material/FormControl';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TealBotton } from '../../styles/Button';
import { Row, Col } from 'react-bootstrap';
import PublicIcon from '@mui/icons-material/Public';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SearchIcon from '@mui/icons-material/Search';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CountryField from './CountryField';
import RegionField from './RegionField';
import GetCities from './GetCities';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
// import GetActivities from './GetActivities';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "1000px",
  bgcolor: 'background.paper',
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  backgroundColor: "#EEF0F2",
  display: "flex",
  flexDirection: "column",
  paddingTop: "80px",
  paddingBottom: "80px",
};

const styleTwo = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "1000px",
  bgcolor: 'background.paper',
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#EEF0F2",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "80px",
};

const formStyle = {
  marginTop: "25px",
  display: "flex",
  flexDirection: "row",
  width: 'fit-content',
  alignItems: "center",
  alignSelf: "center",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingBottom: "10px",
  paddingTop: "10px",
  width: "fit-content",
  borderRadius: "20px",
  textAlign: "center",
  backgroundColor: "white",
  boxShadow: "1px 3px #888888",
  border: (theme) => `1px solid ${theme.palette.divider}`,
  '& hr': {
    mx: 4,
  },
  '& svg': {
    m: 1.5,
  },
};

const regionOptions = [
  { code: 'EU', name: 'Europe' },
  { code: 'SEA', name: 'South-East Asia' },
  { code: 'EMED', name: 'Eastern Mediterranean' },
  { code: 'WP', name: 'Western Pacific' },
  { code: 'AMER', name: 'Americas' },
  { code: 'AF', name: 'Africa' },
]

function StepOne({isOpen, onClose, onNext}) {
  const [value, setValue] = React.useState(null);
  const teal = "#0F83A0";

  return(
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="heading2" className='color-dark-teal'>
          Enter your travel details
        </Typography>
        <Box autoComplete='off' sx={formStyle}>
          <BorderColorIcon  sx={{marginTop: "10px", marginRight: "5px"}} color="teal"></BorderColorIcon>
          <FormControl color='teal' variant="standard" sx={{ width: '20ch'}}>
            <Input color='teal' placeholder='Name your trip'/>
          </FormControl>
          <Divider orientation="vertical" flexItem  variant="middle" flex />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              InputAdornmentProps={{ position: 'start' , color: "#0F83A0"}}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              style={{dateInput:{borderWidth: 0} }}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => 
                <TextField
                  color="teal"
                  variant="standard"
                  {...params} 
                  sx={{
                    svg:{color: teal},
                    // input: {color},
                    // label: {color}
                  }}
                  inputProps={{...params.inputProps, placeholder: "When are you going"}}/>
              }
            />
          </LocalizationProvider>
          <Divider orientation="vertical" flexItem  variant="middle" flex />
          <PeopleOutlineIcon  sx={{marginTop: "10px", marginRight: "5px"}} color='teal'></PeopleOutlineIcon>
          <FormControl variant="standard" sx={{ width: '20ch'}}>
            <Input color='teal' placeholder='How many traveller'/>
          </FormControl>
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", marginTop: "80px"}}>
          <Col md={6}>
            <TealBotton onClick={onClose}>Cancel</TealBotton>
          </Col>
          <StepTwo onClose={onClose}></StepTwo>
        </Box>
      </Box>
    </Modal>
  )
}

function StepTwo({onClose}) {
  const [isOpen, setOpen] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [region, setRegion] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const handleOpen = () => {
    setOpen(true);
    setStepThree(false)
  };
  const handleClose = () => {
    // setOpen(false);
    // setStepThree(false)
    onClose()
  };
  const handleBack = () => {
    console.log("backkk")
    setOpen(false);
    setCountry(null);
    setRegion(null);
    setCity(null);
    setStepThree(false)
  }
  const [stepThree, setStepThree] = React.useState(false)

  const randomGenerator = async () => {
    setStepThree(true)
    const index = Math.floor((Math.random() * 100) + 1);
    console.log(index)
    console.log(country)
    const data = await GetCities(country)
    console.log(data)
    const cityCount = data.metadata.totalCount;
    if (cityCount < 100) {
      index = Math.floor((Math.random() * cityCount) + 1);
    } 
    setCity(data.data[index].name)
    if (!country) {
      console.log("hi")
      setCountry({"name": data.data[index].country, "code": data.data[index].countryCode })
    } 
    if (!region) {
      setRegion(regionOptions[0])
    }
    console.log(data[index].name)
    // const activities = await GetActivities(data[index].latitude, data[index].longitude)
  }


  const addTrip = () => {
    setStepThree(false)
  }
  
  return(
    <React.Fragment>
      <Col md={6}>
        <TealBotton onClick={handleOpen}>Next</TealBotton>
      </Col>
      <Modal
        open={isOpen}
      >
        <Box sx={styleTwo}>
          <div style={{display: "flex", justifyContent: "start", flexDirection: "row", alignItems: "center", paddingBottom: "20px"}}>
            <IconButton onClick={handleBack}>
              <ArrowBackIosIcon color='teal' sx={{marginTop: "10px", marginRight: "5px"}} fontSize="small"></ArrowBackIosIcon>
            </IconButton>
            {/* <Typography variant='body' className='color-medium-teal mt-2'>Back</Typography> */}
          </div>
          <Typography variant="heading2" className='color-dark-teal text-center'>
            Add cities to your trip
          </Typography>
          <Typography variant='body2' className='color-dark-teal mt-2 text-center'>Optionally enter a region and/or country and click 'Find my city' and we will show you a recommended city.</Typography>
          <Box autoComplete='off' sx={formStyle}>
            <PublicIcon  sx={{marginTop: "10px", marginRight: "5px"}} color="teal"></PublicIcon>
            <FormControl color='teal' variant="standard" sx={{ width: '10'}}>
              {/* <Input color='teal' placeholder='Europe' value="Europe"/> */}
              <RegionField options={regionOptions} placeholder='Any region' region={region} handleInput={(e, v) => setRegion(v)}></RegionField>
            </FormControl>
            <Divider orientation="vertical" flexItem  variant="middle" flex />
            <EmojiFlagsIcon  sx={{marginTop: "10px", marginRight: "5px"}} color="teal"></EmojiFlagsIcon>
            <FormControl color='teal' variant="standard" sx={{ width: '10'}}>
              <CountryField value={country} handleInput={(e, v) => setCountry(v) } ></CountryField>
            </FormControl>
            <Divider orientation="vertical" flexItem  variant="middle" flex />
            <LocationCityIcon  sx={{marginTop: "10px", marginRight: "5px"}} color='teal'></LocationCityIcon>
            <FormControl variant="standard" sx={{ width: '40' }} color="teal">
              <Input color='teal' placeholder='City' value={city}/>
            </FormControl>
          </Box>
          <div style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center"}} className="mt-2">
            {
              stepThree ? (
                <div style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", paddingBottom: "20px"}}>
                  <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width:"120px"}}>
                    <IconButton onClick={randomGenerator}>
                      <ChangeCircleIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></ChangeCircleIcon>
                    </IconButton>
                    <Typography variant='caption' className='color-medium-teal'>Try again</Typography>
                  </div>
                  {<div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width:"120px"}}>
                    <IconButton onClick={handleClose}>
                      <AddCircleIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></AddCircleIcon>
                    </IconButton>
                    <Typography variant='caption' className='color-medium-teal'>Add to Trip</Typography>
                  </div>}
                  <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width:"120px"}}>
                    <IconButton>
                      <LocalActivityIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></LocalActivityIcon>
                    </IconButton>
                    <Typography variant='caption' className='color-medium-teal'>View activities</Typography>
                  </div>
                </div>
              ) : (
                <div style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", marginBottom: "80px"}} className="mt-2">
                  <IconButton onClick={randomGenerator}>
                    <ChangeCircleIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></ChangeCircleIcon>
                  </IconButton>
                  <Typography variant='bodyImportant' className='color-medium-teal mt-2'>Find my city</Typography>
                </div>
              )
            }
          </div>
            {stepThree ? (
              <Box sx={{display: "flex", flexDirection: "row", marginTop: "10px"}} className="text-center">
                <Col md={6}>
                  <TealBotton onClick={handleClose}>Cancel</TealBotton>
                </Col>
                <Col md={6}>
                  <TealBotton>Save and view trip</TealBotton>
                </Col>
              </Box> 
            ) : (
              <div></div>
            )}
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export {StepOne, StepTwo}

