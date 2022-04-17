import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { LightButton } from "../../styles/Button";
import { Typography } from "@mui/material";
import "../../styles/DestinationFinder.css";
import { useNavigate, } from 'react-router-dom';

const InfoRow = ({country, updateDesc, lastUpdated, travelStatus, saved, code}) => {
    const [isSaved, setSaved] = React.useState(saved);
    let navigate = useNavigate(); 
    return (
        <Row className="info-row" style={{cursor: 'pointer'}}
            onClick={() => {
                navigate(`/destination/${code}`);
            }}>
            <Col xs={1} style={{textAlignLast: 'left'}}>
                <Typography variant="bodyHeading">{country}</Typography>
            </Col>
            <Col xs={4} style={{padding: '0% 2%'}}>
                <Typography variant="bodyText">{updateDesc}</Typography>
            </Col>
            <Col xs={2} style={{textAlignLast: 'center'}}>
                <Typography variant="bodyText">{lastUpdated.toLocaleDateString()}</Typography>
            </Col>
            <Col xs={2} style={{textAlignLast: 'center'}}>
                <Typography variant="bodyText">{travelStatus}</Typography>
            </Col>
            <Col xs={1} style={{textAlignLast: 'center'}}>
                <Checkbox checked={isSaved} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={(event)=> {setSaved(event.target.checked)}} />
            </Col>
            <Col xs={1}>
                <LightButton>Book</LightButton>
            </Col>
        </Row>
    );
};

export default InfoRow;