import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import PlaneBackground from "../static/plane.png";
import "../styles/DestinationFinder.css";
import GenericSearch from "../components/GenericSearch";
import InfoRow from "../components/DestinationFinder/InfoRow";

const DestinationFinder = () => {
    const [infoRows, setInfoRows] = useState([]);
    useEffect(() => {
        setInfoRows([...infoRowData]);
    }, []);

    return (
        <Container fluid style={{ "margin": 0, "padding": 0, "backgroundColor": "#E2F2FC"}}>
            <Row position="relative" style={{"margin": 0, "padding": 0}}>
                <Image className="plane-background" src={PlaneBackground}/>
                <Container fluid className="filter-destination">
                    <Row>
                        <Col>
                            <GenericSearch fieldLabel={""} options={regionOptions}/>
                        </Col>
                        <Col>
                            <GenericSearch fieldLabel={""} options={adviceLevelOptions}/>
                        </Col>
                        <Col>
                            <GenericSearch fieldLabel={""} options={travelStatusOptions}/>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row style={{"margin": 0, "padding": 0}}>
                <Container fluid className="latest-updates">
                    {infoRows.map((infoRow, idx) => {
                        console.log(infoRow);
                        return (
                            <InfoRow
                                key={idx}
                                country={infoRow.country}
                                updateDesc={infoRow.latestUpdate}
                                lastUpdated={infoRow.lastUpdated}
                                travelStatus={infoRow.travelStatus}
                            />
                        )
                    })}
                </Container>
            </Row>
        </Container>
    );
};

export default DestinationFinder;

const regionOptions = [
    { code: 'EU', label: 'Europe', imageUrl: 'test' },
    { code: 'SEA', label: 'South-East Asia', imageUrl: 'test' },
    { code: 'EMED', label: 'Eastern Mediterranean', imageUrl: 'test' },
    { code: 'WP', label: 'Western Pacific', imageUrl: 'test' },
    { code: 'AMER', label: 'Americas', imageUrl: 'test' },
    { code: 'AF', label: 'Africa', imageUrl: 'test' },
]

const adviceLevelOptions = [
    { code: '4', label: 'Regular Precautions', imageUrl: 'test' },
    { code: '3', label: 'Exercise Caution', imageUrl: 'test' },
    { code: '2', label: 'Reconsider your need for travel', imageUrl: 'test' },
    { code: '1', label: 'Do not travel', imageUrl: 'test' },
]

const travelStatusOptions = [
    { code: 'O', label: 'Open', imageUrl: 'test' },
    { code: 'R', label: 'Open with Restrictions', imageUrl: 'test' },
    { code: 'C', label: 'Closed', imageUrl: 'test' }
]

const infoRowData = [
    { 
        country: 'France', 
        latestUpdate: 'Unvaccinated travelers can now travel to France provided that they have compelling reasons or pressing grounds',
        lastUpdated: new Date(2022, 3, 31),
        travelStatus: 'Open with Restrictions',      
    },
    { 
        country: 'Phillipines', 
        latestUpdate: 'Fully vaccinated nationals of non-visa required countries under Executive Order No. 408 (s.1960) as amended, shall be allowed to enter the Philippines',
        lastUpdated: new Date(2022, 3, 22),
        travelStatus: 'Open with Restrictions',      
    },
    { 
        country: 'Ukraine', 
        latestUpdate: 'The Russian invasion of Ukraine is ongoing. The security situation continues to be volatile and is deteriorating rapidly. Infrastructure and military...',
        lastUpdated: new Date(2022, 3, 20),
        travelStatus: 'Open with Restrictions',      
    },
    { 
        country: 'China', 
        latestUpdate: 'Pre-departure requirements for travel to china from Australia have changed. In addition to meeting visa requirements, there are health testing requirements',
        lastUpdated: new Date(2022, 3, 15),
        travelStatus: 'Closed',      
    }
]