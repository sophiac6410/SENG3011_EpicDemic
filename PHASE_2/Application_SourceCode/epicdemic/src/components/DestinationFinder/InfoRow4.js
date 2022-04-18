import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import HeartBlank from "../../static/heartblank.svg";
import HeartFilled from "../../static/heartfilled.svg"
import { useNavigate, } from 'react-router-dom';
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { LightButton } from "../../styles/Button";
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { travelStatus, travelStatusColor } from "../../styles/Theme";

const InfoRow4 = ({country, updateDesc, lastUpdated, travelStat, saved, code}) => {
    let navigate = useNavigate(); 
    return (
        <Row className="info-row bg-white">
            <Col xs={1}>
                <Typography variant="bodyHeading" style={{cursor: 'pointer'}}       
                onClick={() => {
                    navigate(`/destination/${code}`);
                }}>{country}</Typography>
            </Col>
            <Col xs={4} style={{padding: '0% 2%'}}>
                <Typography variant="bodyText">{updateDesc}</Typography>
            </Col>
            <Col xs={2} style={{textAlignLast: 'center'}}>
                <Typography variant="bodyText">{lastUpdated.toDateString()}</Typography>
            </Col>
            <Col xs={2} style={{textAlignLast: 'center', backgroundColor: travelStatusColor(travelStat)}} className="border-radius-med p-2">
                <Typography variant="bodyText" className="color-white">{travelStatus(travelStat)}</Typography>
            </Col>
            <Col xs={1}>
                <Checkbox defaultChecked={saved} icon={<NotificationsOffIcon className="color-medium-blue" fontSize="large"/>} checkedIcon={<NotificationsActiveIcon className="color-medium-blue" fontSize="large"/> } />
                {/* {saved === true ? <NotificationsActiveIcon className="color-medium-blue" fontSize="large"/> : <NotificationsOffIcon className="color-medium-blue" fontSize="large"/>} */}
            </Col>
            <Col xs={1}>
                <LightButton
                    onClick={() => {
                        navigate(`/destination/${code}/book`);
                    }}>Book
                </LightButton>
            </Col>
        </Row>
    );
};

export default InfoRow4;