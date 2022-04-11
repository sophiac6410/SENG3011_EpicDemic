import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { LightButton } from "../../styles/Global";

const InfoRow = ({country, updateDesc, lastUpdated, travelStatus, saved}) => {
    const [isSaved, setSaved] = React.useState(saved);
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
                <Checkbox checked={isSaved} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={(event)=> {setSaved(event.target.checked)}} />
            </Col>
            <Col xs={2}>
                <LightButton>Book</LightButton>
            </Col>
        </Row>
    );
};

export default InfoRow;