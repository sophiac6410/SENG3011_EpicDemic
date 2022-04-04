import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import BlueDot from "../../static/bluedot.svg"

const InfoRow5 = ({country, desc, dateTime}) => {
    return (
        <Row className="info-row">
            <Col xs={1}>
                <Image src={BlueDot}/>
            </Col>
            <Col xs={1}>
                <b>{country}</b>
            </Col>
            <Col xs={8}>
                {desc}
            </Col>
            <Col xs={1}>
                {dateTime.toLocaleDateString()}
            </Col>
        </Row>
    );
};

export default InfoRow5;