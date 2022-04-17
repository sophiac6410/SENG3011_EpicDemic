import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import BlueDot from "../../static/bluedot.svg"
import { Typography } from "@mui/material";

const InfoRow5 = ({country, desc, dateTime}) => {
    return (
        <Row className="info-row bg-white" style={{margin: '2% 0%'}}>
            <Col xs={2}>
                <Typography variant="bodyHeading">{country}</Typography>
            </Col>
            <Col xs={7}>
                <Typography variant="bodyText">{desc}</Typography>
            </Col>
            <Col xs={2} style={{textAlignLast: 'end'}}>
                <Typography variant="bodyText">{dateTime.toLocaleDateString()}</Typography>
            </Col>
        </Row>
    );
};

export default InfoRow5;