import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import InfoIcon from '@mui/icons-material/Info';
import { LightButton } from "../../styles/Button";

const InfoRow2 = ({country, arrivals, travelStatus}) => {
    return (
        <Row className="info-row-2">
            <Col xs={2}>
                <b>{country}</b>
            </Col>
            <Col xs={4}>
                {arrivals.toLocaleString()}
            </Col>
            <Col xs={4}>
                {travelStatus}
                <InfoIcon fontSize="small" className="color-medium-blue" sx={{ml: 1}}/>
            </Col>
            <Col xs={2}>
                <LightButton>Book</LightButton>
            </Col>
        </Row>
    );
};

export default InfoRow2;