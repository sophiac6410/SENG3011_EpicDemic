import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import HeartBlank from "../../static/heartblank.svg";
import HeartFilled from "../../static/heartfilled.svg";
import { useNavigate, } from 'react-router-dom';

const InfoRow = ({country, updateDesc, lastUpdated, travelStatus, saved}) => {
    let navigate = useNavigate(); 
    return (
        <Row className="info-row"
            onClick={() => {
                navigate('/destination/PHILIPPINES');
            }}>
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
                <Button className="book-button"
                    onClick={() => {
                        navigate('/destination/PHILIPPINES/book');
                    }}>
                    Book
                </Button>
            </Col>
        </Row>
    );
};

export default InfoRow;