import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/DestinationFinder.css";

const HeaderInfoRow4 = () => {
    return (
        <Row className="header-info-row">
            <Col xs={1}>
                COUNTRY
            </Col>
            <Col xs={4}>
                LATEST UPDATE
            </Col>
            <Col xs={2}>
                LAST UPDATE
            </Col>
            <Col xs={2}>
                TRAVEL STATUS
            </Col>
            <Col xs={1}>
                NOTIFY
            </Col>
            <Col xs={1}>
                FLIGHTS
            </Col>
        </Row>
    );
};

export default HeaderInfoRow4;