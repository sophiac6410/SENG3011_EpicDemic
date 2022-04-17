import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import HeartBlank from "../../static/heartblank.svg";
import HeartFilled from "../../static/heartfilled.svg";
import Bell from "../../static/belllight.svg";
import BellSilent from "../../static/bellsilent.svg";
import { useNavigate, } from 'react-router-dom';
import { Typography } from "@mui/material";
import { LightButton } from "../../styles/Button";
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const InfoRow4 = ({country, updateDesc, lastUpdated, travelStatus, saved, code}) => {
    let navigate = useNavigate(); 
    return (
        <Row className="info-row bg-white" style={{cursor: 'pointer'}}       
            onClick={() => {
                navigate(`/destination/${code}`);
            }}>
            <Col xs={1}>
                <Typography variant="bodyHeading">{country}</Typography>
            </Col>
            <Col xs={4} style={{padding: '0% 2%'}}>
                <Typography variant="bodyText">{updateDesc}</Typography>
            </Col>
            <Col xs={2} style={{textAlignLast: 'center'}}>
                <Typography variant="bodyText">{lastUpdated.toDateString()}</Typography>
            </Col>
            <Col xs={2} style={{textAlignLast: 'center'}}>
                <Typography variant="bodyText">{travelStatus}</Typography>
            </Col>
            <Col xs={1}>
                {saved === true ? <NotificationsActiveIcon className="color-medium-blue" fontSize="large"/> : <NotificationsOffIcon className="color-medium-blue" fontSize="large"/>}
            </Col>
            <Col xs={1}>
                <LightButton
                    onClick={() => {
                        navigate('/destination/PHILIPPINES/book');
                    }}>Book
                </LightButton>
            </Col>
        </Row>
    );
};

export default InfoRow4;