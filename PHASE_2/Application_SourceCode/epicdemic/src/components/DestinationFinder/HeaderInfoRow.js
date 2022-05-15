import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import { Typography } from "@mui/material";

const HeaderInfoRow = () => {
    return (
        <Row className="header-info-row" style={{fontSize: 12}}>
            <Col xs={1}>
                <Typography variant="heading3" sx={{fontWeight: 400}}>COUNTRY</Typography>
            </Col>
            <Col xs={4}>
                <Typography variant="heading3" sx={{fontWeight: 400}}>ENTRY REQUIREMENTS</Typography>
            </Col>
            <Col xs={2}>
                <Typography variant="heading3" sx={{fontWeight: 400}}>DATE</Typography>
            </Col>
            <Col xs={2}>
                <Typography variant="heading3" sx={{fontWeight: 400}}>TRAVEL STATUS</Typography>
            </Col>
            <Col xs={1}>
                <Typography variant="heading3" sx={{fontWeight: 400}}>SAVED</Typography>
            </Col>
            <Col xs={1}>
                <Typography variant="heading3" sx={{fontWeight: 400}}>FLIGHTS</Typography>
            </Col>
        </Row>
    );
};

export default HeaderInfoRow;