import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { LightButton } from "../../styles/Button";
import { Typography } from "@mui/material";
import "../../styles/DestinationFinder.css";
import { useNavigate, } from 'react-router-dom';
import { travelStatusColor, travelStatus } from "../../styles/Theme";
import { saveDestination } from "../../apiCalls";

const InfoRow = ({country, updateDesc, lastUpdated, travelStat, saved, code}) => {
    const [isSaved, setSaved] = React.useState(saved);
    let navigate = useNavigate(); 
    const handleClickSave = (event) => {
        let method;
        if (saved) {
            method = 'DELETE';
        } else {
            method = 'PUT';
        }
        setSaved(event.target.checked);
        saveDestination(method, code);
    }
    
    return (
        <Row className="info-row">
            <Col xs={1} style={{textAlignLast: 'left'}}>
                <Typography variant="bodyHeading" style={{cursor: 'pointer'}}
                onClick={() => {
                    navigate(`/destination/${code}`);
                }}>{country}</Typography>
            </Col>
            <Col xs={4} style={{padding: '0% 2%'}}>
                <Typography variant="bodyText">{updateDesc}</Typography>
            </Col>
            <Col xs={2} style={{textAlignLast: 'center'}}>
                <Typography variant="bodyText">{lastUpdated.toLocaleDateString()}</Typography>
            </Col>
            <Col xs={2} style={{textAlignLast: 'center', backgroundColor: travelStatusColor(travelStat)}} className="border-radius-med p-2">
                <Typography variant="bodyText" className="color-white">{travelStatus(travelStat)}</Typography>
            </Col>
            <Col xs={1} style={{textAlignLast: 'center'}}>
                <Checkbox checked={isSaved} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleClickSave} />
            </Col>
            <Col xs={1}>
                <LightButton onClick={()=> {
                    navigate(`/destination/${code}/book`)
                }}>Book</LightButton>
            </Col>
        </Row>
    );
};

export default InfoRow;