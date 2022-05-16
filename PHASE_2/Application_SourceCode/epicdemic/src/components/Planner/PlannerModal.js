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
import { Col, Row } from 'react-bootstrap';
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
import FindCities from './FindCities';
import { GetActivities } from '../../adapters/activityAPI';
import { addCityToTrip, createTrip } from './tripApiCalls';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ConstructionOutlined, Margin, TripOriginOutlined } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputField from '../InputField';
import { Field } from '../Form'
import ActivityModal from "./ActivityModal";


const { allCountries } = require('./CountryField');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70vw",
  bgcolor: 'background.paper',
  borderRadius: "30px",
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
  width: "70vw",
  bgcolor: 'background.paper',
  borderRadius: "30px",
  boxShadow: 24,
  pb: 4,
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
  borderRadius: "30px",
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
          <FormControl variant="standard" sx={{ width: '12ch'}}>
            <Input color='teal'  placeholder='Travellers' type='number' value={travellers} onChange={(event) => {setTravellers(event.target.value)}}/>
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
  const [isOpen, setOpen] = React.useState(false);
  const [country, setCountry] = React.useState(null);
  const [region, setRegion] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [cityOptions, setCityOptions] = React.useState([]);
  const [lat, setLat] = React.useState(0.0000)
  const [long, setLong] = React.useState(0.0000)
  const [tripId, setTripId] = React.useState(1);
  const [cityId, setCityId] = React.useState(0);
  const [back, setBack] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const [activity, setActivity] = React.useState([])
  const [cityIndex, setCityIndex] = React.useState(-1)
  const [cityPhoto, setCityPhoto] = React.useState('')
  const [knownFor, setKnownFor] = React.useState([])

  const handleOpen = async () => {
    if (!back) {
      const data = await createTrip(name, start, end, parseInt(travellers));
      setTripId(data.id)
    }
    setOpen(true);
    setKnownFor([])
    setStepThree(false);
  };
  const handleAdd = async () => {
    var data = {}
    if (city.latitude) {
      data = await addCityToTrip(tripId, city.name, city.latitude, city.longitude, country.code, country.name);
      setCityId(data.id);
      setAdded(!added)
    } else {
      data = await addCityToTrip(tripId, city.name, city.lat, city.lng, country.code, country.name);
      setCityId(data.id);
      setAdded(!added)
    }
  };

  const addCity = () => {
    setAdded(true)
  }

  const handleRemove = async () => {
    //TODO
    console.log("unsave City")
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
    setAdded(false)
    async function getPhoto(city) {
      const { photos, known_for } = await getDestinationPhotos(city.name + ', ' + city.country, false)
      console.log('photo', photos);
      if (photos && photos.length > 0) {
        setCityPhoto(photos[0])
      }
      if (known_for && known_for.length > 0) {
        setKnownFor(known_for)
        console.log(known_for)
      } else {
        setKnownFor([])
      }
    }
    if (region && !country) {
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
      const countryObj = allCountries.find(e => e.name === data.data[index].country)
      if (countryObj) {
        setCountry(countryObj)
        setRegion(countryObj.continent)
      }
      getPhoto(data.data[index])
    } else {
      var index = Math.floor((Math.random() * 9) + 0)
      const data = await FindCities(country)
      console.log(data)
      const cities = await data.data.getPlaces
      if (cities.length < 10) {
        index = Math.floor((Math.random() * (cities.length - 1)))
      }

      const cityObj = { "id": cities[index].id, "name": cities[index].name, "latitude": cities[index].lat, "country": cities[index].country, "longitude": cities[index].lng }
      setCityOptions(cities)
      setCity(cityObj)
      setLat(cities[index].lat)
      setLong(cities[index].lng)
      setCountry({"name": cities[index].country, "code": "AU" })
      const countryObj = allCountries.find(e => e.name === cities[index].country)
      if (countryObj) {
        setCountry(countryObj)
        setRegion(countryObj.continent)
      }
      getPhoto(cities[index])
    }
    
    // const activities = await GetActivities(data.data[index].latitude, data.data[index].longitude)
    
  };

  const handleCountry = async (country) => {
    setCountry(country)
    setCity(null)
    const data = await GetCities(country, "name")
    setCityOptions(data.data)
    setKnownFor([])
    setRegion(country.continent)
  }

  const handleCity = (city) => {
    console.log('city', city);
    setCity(city)
    setStepThree(true)
    setAdded(false)

    async function getPhoto() {
      if (city !== null && city.name !== null) {
        const { photos, known_for } = await getDestinationPhotos(city.name + ', ' + city.country, false)
        console.log('photo', photos);
        if (photos && photos.length > 0) {
          setCityPhoto(photos[0])
        } 
        if (known_for && known_for.length > 0) {
          setKnownFor(known_for)
          console.log("known for", known_for)
        } else {
          setKnownFor([])
        }
      } else {
        setKnownFor([])
      }
    }
    getPhoto()
    // const data = await addCityToTrip(city.name, lat, long, country.code, country.name);
  }

  function getPhoto() {
    return `url(${cityPhoto})`
  }
  let navigate = useNavigate()
  const saveTrip = () => {
    navigate(`/trip/${tripId}`)
    // navigate(`trip/${tripId}`)
  }

  useEffect(() => {
    async function updateActivity() {
      // setLoading(true)
      if(city){
        if (city.latitude) {
          var {out, controller} = await GetActivities({lat: city.latitude, lot: city.longitude})
        } else {
          var {out, controller} = await GetActivities({lat: city.lat, lot: city.lng})
        }
        console.log(out)
        out.then(res => {
          console.log(res.status)
          console.log(res.data)
          if(res.data == null || res.status != 200) {
            setActivity([]); // dispatching data to components state
          }else{
            setActivity(res.data); // dispatching data to components state
          }
          console.log(res.data)
        }).catch(err => {
          console.log(err)
          // setLoading(false)
        });
      }else{
        setActivity([]); // dispatching data to components state
      }
    }
    updateActivity()
    return () => {
      setActivity([]);
    };
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
          <div className= "border-radius-med">
          { stepThree
            ? <>
              <div style={{backgroundImage: getPhoto(), backgroundSize: 'cover', backgroundRepeat: 'no-repeat', width: '100%', marginBottom: '10px'}}>
                <div style={{display: "flex", flexDirection: "row", padding: "20px", height: '80px'}}>
                  <IconButton onClick={handleBack} sx={{alignItems: 'top'}}>
                    <ArrowBackIosIcon sx={{color: 'white'}} fontSize="small"></ArrowBackIosIcon>
                  </IconButton>
                  <Typography variant='body' className='color-white mt-2'>Back</Typography>
                </div>
                <div style={{verticalAlign: 'bottom', margin: 'auto', justifyContent: 'center', marginTop: '250px'}}>
                <Typography variant="heading1" className='color-white text-center'><b>{city !== null ? (city.name + ', ' + city.country) : ''}</b></Typography>
                </div>
              </div>
              <div style={{ display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                {knownFor.length > 0 && Object.keys(knownFor).map((key, _) => {
                  return(
                  <div key={key}style={{display: 'flex', flexDirection: 'row'}}>
                    <img src={knownFor[key].icon+"-48.png"} style={{width:'30px', height: '30px', marginLeft: '20px'}}></img>
                    <Typography variant="body" className='color-dark-teal text-center' style={{marginTop: '5px', marginLeft: '15px'}} >{knownFor[key].name}</Typography>
                  </div>)
                })}
                {knownFor.length > 7 
                  ? <div style={{height: '50px'}}></div>
                  : <div style={{height: '20px'}}></div>
                }
              </div>
              </>
            : <>
                <div style={{display: "flex", justifyContent: "start", flexDirection: "row", alignItems: "center", paddingBottom: "20px"}}>
                  <IconButton onClick={handleBack}>
                    <ArrowBackIosIcon color='teal' sx={{marginTop: "10px"}} fontSize="small"></ArrowBackIosIcon>
                  </IconButton>
                  <Typography variant='body' className='color-medium-teal mt-2'>Back</Typography>
                </div>
                <Typography variant="heading2" className='color-dark-teal text-center'>
                  Add cities to your trip
                </Typography>
                <Typography variant='body2' className='color-dark-teal mt-2 text-center'>Optionally enter a region and/or country and click 'Recommend me a city' and we will recommended you a destination.</Typography>
            </>
          }
          </div>
          <Box autoComplete='off' sx={formStyle}>
            <PublicIcon  sx={{marginTop: "10px", marginRight: "5px"}} color="teal"></PublicIcon>
            <FormControl color='teal' variant="standard" sx={{ width: '10'}}>
              {/* <Input color='teal' placeholder='Europe' value="Europe"/> */}
              <RegionField placeholder='Any region' width={170} value={region} handleInput={(e, v) => setRegion(v)}></RegionField>
            </FormControl>
            <Divider orientation="vertical" flexItem  variant="middle" flex />
            <EmojiFlagsIcon  sx={{marginTop: "10px", marginRight: "5px"}} color="teal"></EmojiFlagsIcon>
            <FormControl color='teal' variant="standard" sx={{ width: '10'}}>
              <CountryField value={country} region={region} handleInput={(e, v) => handleCountry(v) } ></CountryField>
            </FormControl>
            <Divider orientation="vertical" flexItem  variant="middle" flex />
            <LocationCityIcon  sx={{marginTop: "10px", marginRight: "5px"}} color='teal'></LocationCityIcon>
            <FormControl variant="standard" sx={{ width: '40' }} color="teal">
            <RegionField options={cityOptions} placeholder='City' width={270} value={city} handleInput={(e, v) => handleCity(v)}></RegionField>
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
                    <IconButton onClick={handleRemove}>
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
                  <ActivityModal fromTrip={false} tripId={tripId} activities={activity} city={city} country={country} updateActivity={addCity}></ActivityModal>
                </div>
              ) : (
                <div style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", marginBottom: "80px"}} className="mt-2">
                  <IconButton onClick={randomGenerator}>
                    <ChangeCircleIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></ChangeCircleIcon>
                  </IconButton>
                  <Typography variant='bodyImportant' className='color-medium-teal mt-2'>Recommend me a city</Typography>
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

export {StepOne, StepTwo}
