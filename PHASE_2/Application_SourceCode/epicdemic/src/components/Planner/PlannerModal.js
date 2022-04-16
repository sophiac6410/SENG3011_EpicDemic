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
import { Col } from 'react-bootstrap';
import PublicIcon from '@mui/icons-material/Public';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SearchIcon from '@mui/icons-material/Search';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

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
    mx: 2,
  },
  '& svg': {
    m: 1.5,
  },
};

function StepOne({isOpen, onClose, onNext}) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
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
              label="start from"
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
              label="end at"
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
                  inputProps={{...params.inputProps, placeholder: "End Date"}}/>
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
            <TealBotton onClick={onClose}>Cancle</TealBotton>
          </Col>
          <StepTwo onClose={onClose}></StepTwo>
        </Box>
      </Box>
    </Modal>
  )
}

function StepTwo({onClose}) {
  const [isOpen, setOpen] = React.useState(null);
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
          <Box autoComplete='off' sx={formStyle}>
            <PublicIcon  sx={{marginTop: "10px", marginRight: "5px"}} color="teal"></PublicIcon>
            <FormControl color='teal' variant="standard" sx={{ width: '20'}}>
              <Input color='teal' placeholder='Europe' value="Europe"/>
            </FormControl>
            <Divider orientation="vertical" flexItem  variant="middle" flex />
            <EmojiFlagsIcon  sx={{marginTop: "10px", marginRight: "5px"}} color="teal"></EmojiFlagsIcon>
            <FormControl color='teal' variant="standard" sx={{ width: '20'}}>
              <Input color='teal' placeholder='Any Country'/>
            </FormControl>
            <Divider orientation="vertical" flexItem  variant="middle" flex />
            <LocationCityIcon  sx={{marginTop: "10px", marginRight: "5px"}} color='teal'></LocationCityIcon>
            <FormControl variant="standard" sx={{ width: '20'}} color="teal">
              <Input color='teal' placeholder='City'/>
            </FormControl>
            <IconButton onClick={randomGenerator}>
              <SearchIcon x={{marginTop: "10px", marginRight: "5px"}} color='teal'></SearchIcon>
            </IconButton>
          </Box>
          <div style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center"}} className="mt-2">
            {
              stepThree ? (
                <div style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", paddingBottom: "20px"}}>
                  <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width:"120px"}}>
                    <IconButton onClick={handleClose}>
                      <ChangeCircleIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></ChangeCircleIcon>
                    </IconButton>
                    <Typography variant='caption' className='color-medium-teal'>Choose for you</Typography>
                  </div>
                  {/* <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width:"120px"}}>
                    <IconButton onClick={handleClose}>
                      <AddCircleIcon sx={{marginTop: "10px", marginRight: "5px"}} color='teal' fontSize='large'></AddCircleIcon>
                    </IconButton>
                    <Typography variant='caption' className='color-medium-teal'>Add to Trip</Typography>
                  </div> */}
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
                  <Typography variant='bodyImportant' className='color-medium-teal mt-2'>Choose for you</Typography>
                </div>
              )
            }
          </div>
            {stepThree ? (
              <Box sx={{display: "flex", flexDirection: "row", marginTop: "10px"}} className="text-center">
                <Col md={6}>
                  <TealBotton onClick={handleClose}>Cancle</TealBotton>
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

export {StepOne, StepTwo, formStyle}