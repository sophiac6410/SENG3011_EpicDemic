import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import InfoIcon from "../../static/infoteal.svg";

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
                <Image style={{marginLeft: 10}} src={InfoIcon}/>
            </Col>
            <Col xs={2}>
                <Button className="book-button">Book</Button>
            </Col>
        </Row>
    );
};

export default InfoRow2;