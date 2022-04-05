import React, { useState, useEffect } from "react";
import { useNavigate, } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import PlaneBackground from "../static/plane.png";
import WorldMap from "../static/hexworldmap.svg";
import "../styles/DestinationFinder.css";
import GenericSearch from "../components/GenericSearch";
import InfoRow from "../components/DestinationFinder/InfoRow";
import InfoRow2 from "../components/DestinationFinder/InfoRow2";
import HeaderInfoRow from "../components/DestinationFinder/HeaderInfoRow";
import HeaderInfoRow2 from "../components/DestinationFinder/HeaderInfoRow2";
import HexTeal from "../static/hexteal.svg";
import HexMedTeal from "../static/hexmedteal.svg";
import HexWhite from "../static/hexwhite.svg";
import BalloonBackground from "../static/balloontravel.jpg"

const DestinationFinder = () => {
    const [infoRows, setInfoRows] = useState([]);
    const [popularDestinations, setPopularDestinations] = useState([]);

    let navigate = useNavigate(); 

    useEffect(() => {
        setInfoRows([...infoRowData]);
        setPopularDestinations([...popularDestinationsData]);
    }, []);

    return (
        <Container fluid style={{ "--bs-gutter-x": 0, "margin": 0, "padding": 0, "backgroundColor": "#E2F2FC"}}>
            <Row position="relative" style={{"--bs-gutter-x": 0, "padding": 0}}>
                <Image className="plane-background" src={PlaneBackground}/>
                <Container fluid className="filter-destination">
                    <Row>
                        <Col style={{marginLeft: "3vw", marginRight: "3vw"}}>
                            <GenericSearch fieldLabel={"Region"} options={regionOptions}/>
                        </Col>
                        <Col style={{marginLeft: "3vw", marginRight: "3vw"}}>
                            <GenericSearch fieldLabel={"Advice Level"} options={adviceLevelOptions}/>
                        </Col>
                        <Col style={{marginLeft: "3vw", marginRight: "3vw"}}>
                            <GenericSearch fieldLabel={"Travel Status"} options={travelStatusOptions}/>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row style={{"margin": 0, "padding": 0, "marginTop": "10vh"}}>
                <Container fluid className="latest-updates">
                    <HeaderInfoRow/>
                    {infoRows.map((infoRow, idx) => {
                        return (
                            <InfoRow
                            key={idx}
                            country={infoRow.country}
                            updateDesc={infoRow.latestUpdate}
                            lastUpdated={infoRow.lastUpdated}
                            travelStatus={infoRow.travelStatus}
                            saved={infoRow.saved}
                            />
                            )
                        })}
                </Container>
            </Row>
            <Row className="map-section">
                <b style={{"marginLeft": "15vw", "font": "Nunito", "fontSize": 30}}>TRAVEL REGULATIONS MAP</b>
                <Image className="world-map" src={WorldMap}/>
            </Row>
            <Row className="map-legend">
                <Col style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
                    <Image style={{"marginRight" : "1vw"}} src={HexTeal}/>
                    Closed
                </Col>
                <Col style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
                    <Image style={{"marginRight" : "1vw"}} src={HexWhite}/>
                    Open with restrictions
                </Col>
                <Col style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
                    <Image style={{"marginRight" : "1vw"}} src={HexMedTeal}/>
                    Open
                </Col>
            </Row>
            <Row position="relative" style={{"margin": 0, "marginTop": "15vh", "padding": 0}}>
                <Container fluid style={{"margin": 0, padding: 0}}>
                    <Row style={{"margin": 0, padding: 0}}>
                        <Col style={{"margin": 0}}>
                            <Image className="balloon-background" src={BalloonBackground}/>
                        </Col>
                        <Col>
                            <Row>
                                <b style={{"font": "Nunito", "fontSize": 30 }}>MOST POPULAR TRAVEL DESTINATIONS</b>
                                <Container fluid className="popular-travel">
                                    <HeaderInfoRow2/>
                                    {popularDestinations.map((popDest, idx) => {
                                        return (
                                            <InfoRow2
                                            key={idx}
                                            country={popDest.country}
                                            arrivals={popDest.arrivals}
                                            travelStatus={popDest.travelStatus}
                                            />
                                            )
                                        })}
                                </Container>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row position="relative" style={{"marginLeft": 0, "marginRight": 0, "marginTop": "15vh", "paddingBottom": "25vh", "paddingLeft": 0, "paddingRight": 0}}>
                <Col style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
                    <Button className="recommend-dest-button"
                        onClick={() => {
                            navigate('/saved');
                        }}
                    >
                        Recommend me a destination
                    </Button>
                </Col>
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
        saved: false      
    },
    { 
        country: 'Phillipines', 
        latestUpdate: 'Fully vaccinated nationals of non-visa required countries under Executive Order No. 408 (s.1960) as amended, shall be allowed to enter the Philippines',
        lastUpdated: new Date(2022, 3, 22),
        travelStatus: 'Open with Restrictions',
        saved: true      
    },
    { 
        country: 'Ukraine', 
        latestUpdate: 'The Russian invasion of Ukraine is ongoing. The security situation continues to be volatile and is deteriorating rapidly. Infrastructure and military...',
        lastUpdated: new Date(2022, 3, 20),
        travelStatus: 'Open with Restrictions',
        saved: true      
    },
    { 
        country: 'China', 
        latestUpdate: 'Pre-departure requirements for travel to china from Australia have changed. In addition to meeting visa requirements, there are health testing requirements',
        lastUpdated: new Date(2022, 3, 15),
        travelStatus: 'Closed',
        saved: false      
    },
    { 
        country: 'China', 
        latestUpdate: 'Pre-departure requirements for travel to china from Australia have changed. In addition to meeting visa requirements, there are health testing requirements',
        lastUpdated: new Date(2022, 3, 15),
        travelStatus: 'Closed',
        saved: true      
    },
    { 
        country: 'China', 
        latestUpdate: 'Pre-departure requirements for travel to china from Australia have changed. In addition to meeting visa requirements, there are health testing requirements',
        lastUpdated: new Date(2022, 3, 15),
        travelStatus: 'Closed',
        saved: true      
    },
    { 
        country: 'China', 
        latestUpdate: 'Pre-departure requirements for travel to china from Australia have changed. In addition to meeting visa requirements, there are health testing requirements',
        lastUpdated: new Date(2022, 3, 15),
        travelStatus: 'Closed',
        saved: true      
    },
    { 
        country: 'China', 
        latestUpdate: 'Pre-departure requirements for travel to china from Australia have changed. In addition to meeting visa requirements, there are health testing requirements',
        lastUpdated: new Date(2022, 3, 15),
        travelStatus: 'Closed',
        saved: true      
    },
    { 
        country: 'China', 
        latestUpdate: 'Pre-departure requirements for travel to china from Australia have changed. In addition to meeting visa requirements, there are health testing requirements',
        lastUpdated: new Date(2022, 3, 15),
        travelStatus: 'Closed',
        saved: true      
    }
]

const popularDestinationsData = [
    { 'country': 'France', 'arrivals': 89400000, 'travelStatus': 'Open with Restrictions' },
    { 'country': 'Spain', 'arrivals': 8370000, 'travelStatus': 'Open with Restrictions' },
    { 'country': 'United States', 'arrivals': 79300000, 'travelStatus': 'Open with Restrictions' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
    { 'country': 'China', 'arrivals': 79300000, 'travelStatus': 'Closed' },
]