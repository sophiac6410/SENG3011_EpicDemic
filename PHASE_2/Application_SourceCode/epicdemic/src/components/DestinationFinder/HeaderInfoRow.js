import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/DestinationFinder.css";

const HeaderInfoRow = () => {
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
                SAVED
            </Col>
            <Col xs={2}>
                FLIGHTS
            </Col>
        </Row>
    );
};

export default HeaderInfoRow;