import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import HeartBlank from "../../static/heartblank.svg";
import HeartFilled from "../../static/heartfilled.svg";

const InfoRow = ({country, updateDesc, lastUpdated, travelStatus, saved}) => {
    return (
        <Row className="info-row">
            <Col xs={1}>
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
                {saved === true ? <Image className="heart-image" src={HeartFilled}/> : <Image className="heart-image" src={HeartBlank}/>}
            </Col>
            <Col xs={2}>
                <Button className="book-button">Book</Button>
            </Col>
        </Row>
    );
};

export default InfoRow;