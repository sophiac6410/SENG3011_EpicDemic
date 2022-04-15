import { Card, Col, Row } from "react-bootstrap";
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import CircleIcon from '@mui/icons-material/Circle';
import { useNavigate, } from 'react-router-dom';
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import {colorScore} from "../../styles/Theme";
import { getDestination } from "../../apiCalls";
  
function LocationCard({id}) {
  let navigate = useNavigate(); 
  const routeChange = () =>{  
    navigate(`/destination/${id}`);
  }

  const [country, setCountry] = React.useState('');

  useEffect(() => {
    async function fetchData () {
      const data = await getDestination(id);
      setCountry(data.country);
    }
    fetchData();
  }, []);

  return (
    <Card className="m-2 border-radius-small" style={{width: 'auto'}} onClick={ routeChange }>
      <Card.Body style={{padding: '20px 30px'}}>
        <Card.Title>
          <Typography variant="heading3">{country}</Typography>
        </Card.Title>
        <Card.Subtitle className="pt-1 text-muted">
          <Typography variant="bodyText">Overall Advice</Typography>
        </Card.Subtitle>
        <Row className="align-items-center pt-1 justify-content-start" style={{marginBottom: '10px'}}>
          <Col>
            <SimCardAlertIcon className="color-yellow" sx={{ fontSize: 30, mx: 1 }}></SimCardAlertIcon>
            <Typography variant="bodyImportant" sx={{display: 'inline'}}>Exercise Caution</Typography>
          </Col>
        </Row>
        <Card.Subtitle className="pt-2 text-muted">
          <Typography variant="bodyText">Travel Status</Typography>
        </Card.Subtitle>
        <Row className="align-items-center pt-1 justify-content-start">
          <Col>
            <CircleIcon className="color-yellow" sx={{ fontSize: 15, mx: 2 }}></CircleIcon>
            <Typography variant="bodyImportant" sx={{display: 'inline'}}>Open with Restrictions</Typography>
          </Col>
        </Row>
        <Row className="pt-2 text-muted">
          <Typography variant="caption" sx={{pt: 2}}>Last Update: 23rd March 2022</Typography>
        </Row>
      </Card.Body>
    </Card>
  )
}
export default LocationCard