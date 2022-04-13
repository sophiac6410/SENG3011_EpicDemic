import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";

const InfoRow3 = ({city, safetyRating, diseaseRisk, travelStatus, lockdown}) => {
    return (
        <Row className="info-row-2">
            <Col xs={1}>
                <b>{city}</b>
            </Col>
            <Col xs={3}>
                {safetyRating}
            </Col>
            <Col xs={2}>
                {diseaseRisk}
            </Col>
            <Col xs={2}>
                {travelStatus}
            </Col>
            <Col xs={2}>
                {lockdown}
            </Col>
            <Col xs={2}>
                <Button className="book-button">Book</Button>
            </Col>
        </Row>
    );
};

export default InfoRow3;