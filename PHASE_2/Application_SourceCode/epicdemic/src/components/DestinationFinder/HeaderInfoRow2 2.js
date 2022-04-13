import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/DestinationFinder.css";

const HeaderInfoRow2 = () => {
    return (
        <Row className="header-info-row-2">
            <Col xs={2}>
                COUNTRY
            </Col>
            <Col xs={4}>
                VISITOR ARRIVALS (M)
            </Col>
            <Col xs={4}>
                TRAVEL STATUS
            </Col>
            <Col xs={2}>
                FLIGHTS
            </Col>
        </Row>
    );
};

export default HeaderInfoRow2;