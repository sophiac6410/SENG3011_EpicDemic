import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import FormControl, { useFormControl } from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import EventIcon from '@mui/icons-material/Event';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DarkButton } from '../../styles/Button';
import { Row, Col } from 'react-bootstrap';

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
};

const formStyle = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "row",
  width: 'fit-content',
  alignItems: "center",
  alignSelf: "center",
  paddingLeft: "20px",
  paddingRight: "20px",
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

function StepOne({isOpen, onClose}) {
  const [value, setValue] = React.useState(null);

  return(
    <Modal
      open={isOpen}
      // onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="heading2" className='color-dark-teal'>
          Enter your travel details
        </Typography>
        <Box autoComplete='off' sx={formStyle}>
          <BorderColorIcon  sx={{marginTop: "10px", marginRight: "5px"}}></BorderColorIcon>
          <FormControl variant="standard" sx={{ width: '20ch', marginBottom: "20px" }}>
            <InputLabel htmlFor="component-simple">Name your trip</InputLabel>
            <Input id="component-simple" />
          </FormControl>
          <Divider orientation="vertical" flexItem  variant="middle" flex />
          {/* <EventIcon  sx={{marginTop: "10px", marginRight: "5px"}}></EventIcon> */}
          {/* <FormControl variant="standard" sx={{ width: '20ch', marginBottom: "20px" }} type="date">
            <InputLabel htmlFor="component-simple">When are you going</InputLabel>
            <Input id="component-simple" />
          </FormControl> */}
          {/* <TextField
            label="where are you going"
            type="date"
            defaultValue="2022-04-06"
          /> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              InputAdornmentProps={{ position: 'start' }}
              variant="inline"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              style={{dateInput:{borderWidth: 0} }}
              renderInput={(params) => <TextField variant="standard" {...params} />}
            />
          </LocalizationProvider>
          <Divider orientation="vertical" flexItem  variant="middle" flex />
          <PeopleOutlineIcon  sx={{marginTop: "10px", marginRight: "5px"}}></PeopleOutlineIcon>
          <FormControl variant="standard" sx={{ width: '20ch', marginBottom: "20px" }}>
            <InputLabel htmlFor="component-simple">How many travellers</InputLabel>
            <Input id="component-simple" />
          </FormControl>
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", marginTop: "30px"}}>
          <Col md={6} >
            <DarkButton onClick={onClose}>Cancle</DarkButton>
          </Col>
          <Col md={6}>
            <DarkButton>Next</DarkButton>
          </Col>
        </Box>
      </Box>
    </Modal>
  )
}

export default StepOne