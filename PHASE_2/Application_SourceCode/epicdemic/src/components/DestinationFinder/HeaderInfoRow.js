import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import { Typography } from "@mui/material";

const HeaderInfoRow = () => {
    return (
        <Row className="header-info-row">
            <Col xs={1}>
                <Typography variant="heading3">COUNTRY</Typography>
            </Col>
            <Col xs={4}>
                <Typography variant="heading3">LATEST UPDATE</Typography>
            </Col>
            <Col xs={2}>
                <Typography variant="heading3">DATE</Typography>
            </Col>
            <Col xs={2}>
                <Typography variant="heading3">TRAVEL STATUS</Typography>
            </Col>
            <Col xs={1}>
                <Typography variant="heading3">SAVED</Typography>
            </Col>
            <Col xs={1}>
                <Typography variant="heading3">FLIGHTS</Typography>
            </Col>
        </Row>
    );
};

export default HeaderInfoRow;