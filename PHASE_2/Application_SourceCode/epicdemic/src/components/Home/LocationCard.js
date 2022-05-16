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
    <Card className="my-2 border-radius-small" style={{width: 'auto', boxShadow: '3px 3px 3px 3px #cccccc', cursor: 'pointer'}}>
      <Card.Body style={{padding: '20px 30px'}}>
        <Card.Title className="d-flex">
          <Typography variant="heading3" sx={{flex: 1}} onClick={ routeChange }>{country}</Typography>
          <div className="d-flex justify-content-end flex-1">
            <div>
              <Checkbox checked={isSaved} icon={<FavoriteBorder className="color-medium-teal"/>} checkedIcon={<Favorite className="color-medium-teal" />} onClick={handleClickSave} />
              <Typography variant="bodySmall" sx={{lineHeight: 0, textAlign: 'center'}}>Save</Typography>
            </div>
            <div>
              <Checkbox defaultChecked={false} icon={<NotificationsNoneIcon className="color-medium-teal"/>} checkedIcon={<NotificationsActiveIcon className="color-medium-teal"/> } />
              <Typography variant="bodySmall" sx={{lineHeight: 0, textAlign: 'center'}}>Notify</Typography>
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
        <Row className="align-items-center pt-1 justify-content-start" style={{marginBottom: '10px'}}>
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