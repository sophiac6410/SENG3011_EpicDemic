import { Card, Col, Row } from "react-bootstrap";
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import CircleIcon from '@mui/icons-material/Circle';
import { useNavigate, } from 'react-router-dom';
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { travelStatus, travelStatusColor, adviceLevel, adviceLevelColor } from "../../styles/Theme";
import { getDestination, saveDestination } from "../../apiCalls";
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
  
function LocationCard({id}) {
  let navigate = useNavigate(); 
  const routeChange = () =>{  
    navigate(`/destination/${id}`);
  }

  const [country, setCountry] = React.useState('');
  const [travelStatusText, setTravelStatusText] = React.useState('');
  const [adviceLevelText, setAdviceLevelText] = React.useState('');
  const [travelColor, setTravelColor] = React.useState('');
  const [adviceColor, setAdviceColor] = React.useState('');
  const [isSaved, setSaved] = React.useState(true);
  const [isNotif, setIsNotif] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [notifMessage, setNotifMessage] = React.useState('');

  const handleClickNotif = (event) => {
    setIsNotif(event.target.checked); 
    if (event.target.checked) {
      setNotifMessage(`You will receive email notifications for ${country}`)
    } else {
      setNotifMessage(`You will no longer receive email notifications for ${country}`)
    }
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const action = (<IconButton
    size="small"
    aria-label="close"
    color="inherit"
    onClick={handleCloseSnack}
  >
    <CloseIcon fontSize="small" />
  </IconButton>)

  const handleClickSave = (event) => {
      let method;
      if (isSaved) {
          method = 'DELETE';
      } else {
          method = 'PUT';
      }
      saveDestination(method, id);
      setSaved(event.target.checked); 
  }
  

  useEffect(() => {
    async function fetchData () {
      const data = await getDestination(id);
      setCountry(data.country);
      setTravelStatusText(travelStatus(data.travel_status));
      setAdviceLevelText(adviceLevel(data.advice_level));
      setTravelColor(travelStatusColor(data.travel_status));
      setAdviceColor(adviceLevelColor(data.advice_level));
    }
    fetchData();
  }, []);

  return (
    <Card className="my-2 border-radius-small" style={{width: 'auto', boxShadow: '3px 3px 3px 3px #cccccc', cursor: 'pointer', marginRight: '15px'}}>
      <Card.Body style={{padding: '20px 30px'}}>
        <Card.Title className="d-flex">
          <Typography variant="heading3" sx={{flex: 1}} onClick={ routeChange }>{country}</Typography>
          <div className="d-flex justify-content-end flex-1">
            <div>
              <Checkbox checked={isSaved} icon={<FavoriteBorder className="color-medium-teal"/>} checkedIcon={<Favorite className="color-medium-teal" />} onClick={handleClickSave} />
              <Typography variant="bodySmall" sx={{lineHeight: 0, textAlign: 'center'}}>Save</Typography>
            </div>
            <div>
              <Checkbox defaultChecked={isNotif} icon={<NotificationsNoneIcon className="color-medium-teal"/>} checkedIcon={<NotificationsActiveIcon className="color-medium-teal"/> } onClick={handleClickNotif}/>
              <Typography variant="bodySmall" sx={{lineHeight: 0, textAlign: 'center'}}>Notify</Typography>
              <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
                action={action}
                message={notifMessage}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
              />
            </div>
            <div>
              <Checkbox icon={<AddCircleOutlineOutlinedIcon className="color-medium-teal"/>} checkedIcon={<AddCircleOutlinedIcon className="color-medium-teal"/>} />
              <Typography variant="bodySmall" sx={{lineHeight: 0, textAlign: 'center'}}>Add Trip</Typography>
            </div>
          </div>
        </Card.Title>
        <div onClick={ routeChange }>
        <Card.Subtitle className="pt-3 text-muted">
          <Typography variant="bodyText">Overall Advice</Typography>
        </Card.Subtitle>
        <Row className="align-items-center pt-1 justify-content-start" style={{marginBottom: '10px', height: '50px'}}>
          <Col className="d-flex align-items-center">
            <SimCardAlertIcon sx={{ fontSize: 30, mx: 1, mt: 1, color: adviceColor, display: 'flex' }}></SimCardAlertIcon>
            <Typography variant="bodyImportant" sx={{display: 'flex'}}>{adviceLevelText}</Typography>
          </Col>
        </Row>
        <Card.Subtitle className="pt-2 text-muted">
          <Typography variant="bodyText">Travel Status</Typography>
        </Card.Subtitle>
        <Row className="align-items-center pt-1 justify-content-start">
          <Col>
            <CircleIcon sx={{ fontSize: 15, mx: 2, color: travelColor }}></CircleIcon>
            <Typography variant="bodyImportant" sx={{display: 'inline'}}>{travelStatusText}</Typography>
          </Col>
        </Row>
        <Row className="pt-2 text-muted">
          <Typography variant="caption" sx={{pt: 2}}>Last Update: 23rd March 2022</Typography>
        </Row>
        </div>
      </Card.Body>
    </Card>
  )
}
export default LocationCard