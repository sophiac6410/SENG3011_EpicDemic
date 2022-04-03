import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../../styles/DestinationFinder.css";

const InfoRow = ({country, updateDesc, lastUpdated, travelStatus, saved}) => {    
    return (
        <Row className="info-row">
            <Col xs={2}>
                <b>{country}</b>
            </Col>
            <Col xs={4}>
                {updateDesc}
            </Col>
            <Col xs={2}>
                {lastUpdated.toLocaleDateString()}
            </Col>
            <Col xs={2}>
                {travelStatus}
            </Col>
            <Col xs={1}>
                <Button className="book-button">Book</Button>
            </Col>
        </Row>
    );
};

export default InfoRow;