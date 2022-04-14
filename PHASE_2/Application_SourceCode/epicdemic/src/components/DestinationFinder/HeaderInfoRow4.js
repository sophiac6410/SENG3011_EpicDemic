import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import { Typography } from "@mui/material";

const HeaderInfoRow4 = () => {
    return (
        <Row className="header-info-row">
            <Col xs={1}>
                <Typography variant="bodyHeading">COUNTRY</Typography>
            </Col>
            <Col xs={4}>
                <Typography variant="bodyHeading">LATEST UPDATE</Typography>
            </Col>
            <Col xs={2}>
                <Typography variant="bodyHeading">LAST UPDATE</Typography>
            </Col>
            <Col xs={2}>
                <Typography variant="bodyHeading">TRAVEL STATUS</Typography>
            </Col>
            <Col xs={1}>
                <Typography variant="bodyHeading">NOTIFY</Typography>
            </Col>
            <Col xs={1}>
                <Typography variant="bodyHeading">FLIGHTS</Typography>
            </Col>
        </Row>
    );
};

export default HeaderInfoRow4;