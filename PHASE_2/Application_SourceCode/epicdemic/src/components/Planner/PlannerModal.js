import React, { useState, useEffect } from "react";
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
import { Col } from 'react-bootstrap';
import PublicIcon from '@mui/icons-material/Public';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { Navigate, useNavigate } from 'react-router-dom';
import ActivityCard from './ActivityCard';
import Carousel from "react-multi-carousel";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CountryField from './CountryField';
import RegionField from './RegionField';
import GetCities from './GetCities';
import { GetActivities } from '../../adapters/activityAPI';
import { addCityToTrip, createTrip } from './tripApiCalls';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TripOriginOutlined } from '@mui/icons-material';

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

const styleThree = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "1000px",
  hight: "1000px",
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
const regionOptions = [
  { id: 'EU', name: 'Europe' },
  { id: 'SEA', name: 'South-East Asia' },
  { id: 'EMED', name: 'Eastern Mediterranean' },
  { id: 'WP', name: 'Western Pacific' },
  { id: 'AMER', name: 'Americas' },
  { id: 'AF', name: 'Africa' },
]

function StepOne({isOpen, onClose, onNext}) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [name, setName] = React.useState('');
  const [travellers, setTravellers] = React.useState();
  const teal = "#0F83A0";

  return(
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="heading2" className='color-dark-teal'>
          Enter your trip details
        </Typography>
        <Box autoComplete='off' sx={formStyle}>
          <BorderColorIcon  sx={{marginTop: "10px", marginRight: "5px"}} color="teal"></BorderColorIcon>
          <FormControl color='teal' variant="standard" sx={{ width: '20ch'}}>
            <Input color='teal' type='text' placeholder='Name your trip' value={name} onChange={(event) => {setName(event.target.value)}}/>
          </FormControl>
          <Divider orientation="vertical" flexItem  variant="middle" flex />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label=" "
              InputAdornmentProps={{ position: 'start' , color: "#0F83A0"}}
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
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
                    marginBottom: '10px'
                    // input: {color},
                    // label: {color}
                  }}
                  inputProps={{...params.inputProps, placeholder: "Start date"}}/>
              }
            />
          </LocalizationProvider>
          <Divider orientation="vertical" flexItem  variant="middle" flex />
          <LocalizationProvider dateAdapter={AdapterDateFns} sx={ {paddingBottom: "20px"}}>
            <DesktopDatePicker
              label=" "
              InputAdornmentProps={{ position: 'start' , color: "#0F83A0"}}
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
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
                    marginBottom: '10px'
                    // input: {color},
                    // label: {color}
                  }}
                  inputProps={{...params.inputProps, placeholder: "End date"}}/>
              }
            />
          </LocalizationProvider>
          <Divider orientation="vertical" flexItem  variant="middle" flex />
          <PeopleOutlineIcon  sx={{marginTop: "10px", marginRight: "5px"}} color='teal'></PeopleOutlineIcon>
          <FormControl variant="standard" sx={{ width: '20ch'}}>
            <Input color='teal'  placeholder='How many travellers' type='number' value={travellers} onChange={(event) => {setTravellers(event.target.value)}}/>
          </FormControl>
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", marginTop: "80px"}}>
          <Col md={6}>
            <TealBotton onClick={onClose}>Cancel</TealBotton>
          </Col>
          <StepTwo onClose={onClose} name={name} start={startDate} end={endDate} travellers={travellers} ></StepTwo>
        </Box>
      </Box>
    </Modal>
  )
}

function StepTwo({onClose, name, start, end, travellers}) {
  const [isOpen, setOpen] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [region, setRegion] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [cityOptions, setCityOptions] = React.useState([]);
  const [lat, setLat] = React.useState(0.0000)
  const [long, setLong] = React.useState(0.0000)
  const [tripId, setTripId] = React.useState(1);
  const [cityId, setCityId] = React.useState(1);
  const [back, setBack] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const [activity, setActivity] = React.useState([])
  const [cityIndex, setCityIndex] = React.useState(-1)

  const handleOpen = async () => {
    if (!back) {
      console.log(name, start, end, travellers)
      const data = await createTrip(name, start, end, parseInt(travellers));
      console.log(data)
      console.log(data.id, data['id']);
      setTripId(data.id)
    }
    setOpen(true);
    setStepThree(false);
  };
  const handleAdd = async () => {
    console.log(tripId);
    console.log(city.name, lat, long, country.name, country.code)
    const data = await addCityToTrip(tripId, city.name, lat, long, country.code, country.name);
    setCityId(data.id);
    setAdded(!added)
  };
  const handleClose = () => {
    onClose()
  };
  const handleBack = () => {
    setOpen(false);
    setCountry(null);
    setRegion(null);
    setCity(null);
    setStepThree(false);
    setBack(true);
    setCityIndex(-1);
  };
  const [stepThree, setStepThree] = React.useState(false)

  /*const handleCity = async (city) => {
    setCity(city)
  }*/
  const randomGenerator = async () => {
    setStepThree(true)
    
    var index = Math.floor((Math.random() * 100) + 1);
    const data = await GetCities(country, "-population")
    const cityCount = data.metadata.totalCount;
    if (cityCount < 100) {
      index = Math.floor((Math.random() * cityCount) + 1);
    }
    console.log(data.data)
    setCityOptions(data.data)
    setCity(data.data[index])
    setLat(data.data[index].latitude)
    setLong(data.data[index].longitude)
    if (!country) {
      setCountry({"name": data.data[index].country, "code": data.data[index].countryCode })
    } 
    if (!region) {
      setRegion(regionOptions[0])
    }
    setAdded(false)
    // const activities = await GetActivities(data.data[index].latitude, data.data[index].longitude)
  };

  const handleCountry = async (country) => {
    setCountry(country)
    setCity(null)
    const data = await GetCities(country, "name")
    setCityOptions(data.data)
  }

  const handleCity = (city) => {
    setCity(city)
    setStepThree(true)
    setAdded(false)
    // const data = await addCityToTrip(city.name, lat, long, country.code, country.name);
  }

  let navigate = useNavigate()
  const saveTrip = () => {
    navigate(`/trip/${tripId}`)
    // navigate(`trip/${tripId}`)
  }

  useEffect(() => {
    async function updateActivity() {
      // setLoading(true)
      var {out, controller} = await GetActivities({lat: city.latitude, lot: city.longitude})
      out.then(res => {
        console.log(res.data)
        setActivity(res.data); // dispatching data to components state
      }).catch(err => {
        console.log(err)
        // setLoading(false)
      });
    }
    updateActivity()
  }, [city])
  
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
              <RegionField options={regionOptions} placeholder='Any region' width={150} value={region} handleInput={(e, v) => setRegion(v)}></RegionField>
            </FormControl>
            <Divider orientation="vertical" flexItem  variant="middle" flex />
            <EmojiFlagsIcon  sx={{marginTop: "10px", marginRight: "5px"}} color="teal"></EmojiFlagsIcon>
            <FormControl color='teal' variant="standard" sx={{ width: '10'}}>
              <CountryField value={country} handleInput={(e, v) => handleCountry(v) } ></CountryField>
            </FormControl>
            <Divider orientation="vertical" flexItem  variant="middle" flex />
            <LocationCityIcon  sx={{marginTop: "10px", marginRight: "5px"}} color='teal'></LocationCityIcon>
            <FormControl variant="standard" sx={{ width: '40' }} color="teal">
            <RegionField options={cityOptions} placeholder='City' width={280} value={city} handleInput={(e, v) => handleCity(v)}></RegionField>
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
                  { added ? (
                    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width:"120px"}}>
                    <IconButton onClick={handleAdd}>
                      <CheckCircleIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></CheckCircleIcon>
                    </IconButton>
                    <Typography variant='caption' className='color-medium-teal'>City Added!</Typography>
                  </div>
                  ) : (
                  <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width:"120px"}}>
                  <IconButton onClick={handleAdd}>
                    <AddCircleIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></AddCircleIcon>
                    </IconButton>
                    <Typography variant='caption' className='color-medium-teal'>Add to Trip</Typography>
                  </div>
                  )}
                  {/* <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width:"120px"}}>
                    <IconButton>
                      <LocalActivityIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></LocalActivityIcon>
                    </IconButton>
                    <Typography variant='caption' className='color-medium-teal'>View activities</Typography>
                  </div> */}
                  <ActivityModal tripId={tripId} activities={activity} city={city}></ActivityModal>
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
                  <TealBotton onClick={saveTrip}>Save and view trip</TealBotton>
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


function ActivityModal({fromTrip, activities, tripId, city}) {
  const [isOpen, setOpen] = React.useState(false);
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
    setOpen(false);
    setStepThree(false)
  }
  const [stepThree, setStepThree] = React.useState(false)

  const randomGenerator = () => {
    setStepThree(true)
  }

  let navigate = useNavigate()
  const saveTrip = () => {
    navigate(`/trip/${tripId}`)
  }

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
        <Box sx={styleThree}>
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
            { activities !== [] && activities !== {} &&
              activities.map((activity) => <ActivityCard key={activity.id} activity={activity} cityId={city.id} tripId={tripId}></ActivityCard>)
            }
          </Carousel>
        </Box>
      </Modal>
    </React.Fragment>
  )
}


export {StepOne, StepTwo, ActivityModal}
