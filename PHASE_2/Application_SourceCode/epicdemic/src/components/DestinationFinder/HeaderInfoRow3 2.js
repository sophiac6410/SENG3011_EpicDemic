import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/DestinationFinder.css";

const HeaderInfoRow3 = () => {
    return (
        <Row className="header-info-row-3">
            <Col xs={1}>
                CITY
            </Col>
            <Col xs={3}>
                SAFETY RATING
            </Col>
            <Col xs={2}>
                DISEASE RISK
            </Col>
            <Col xs={2}>
                TRAVEL STATUS
            </Col>
            <Col xs={2}>
                LOCKDOWN
            </Col>
            <Col xs={2}>
                FLIGHTS
            </Col>
        </Row>
    );
};

export default HeaderInfoRow3;