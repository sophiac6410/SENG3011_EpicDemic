import React, { useState, useEffect } from "react";
import { useNavigate, } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
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
import { DarkButton, WhiteButton } from "../styles/Button";
import NavbarComp from "../components/NavBar";
import Typography from '@mui/material/Typography';
import { getAllLocations, getUserSaved } from "../apiCalls";


const DestinationFinder = () => {
    // const [infoRows, setInfoRows] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [popularDestinations, setPopularDestinations] = useState([]);
    const [savedLocations, setSavedLocations] = useState([]);

    let navigate = useNavigate(); 

    useEffect(() => {
        async function fetchData () {
            const data = await getAllLocations();
            console.log(data);
            setDestinations(data);
            data = await getUserSaved();
            setSavedLocations(data.saved_locations);
        }
        // setInfoRows([...infoRowData]);
        fetchData();
        setPopularDestinations([...popularDestinationsData]);
    }, []);

    const getDate = (date) => {
		const dateObj = new Date(date);
		return dateObj;
	}

    return (
        <div className="bg-off-white">
            <div className="bg-plane">
                <NavbarComp bg={false}/>
                <div className="text-center mb-5" style={{marginTop: "300px"}}>
                    <Typography variant="title" className="color-white mt-5">FIND A DESTINATION BY...</Typography>
                </div>
                <Row style={{margin: "3% 5% 1%"}} className="justify-content-center">
                    <Col className="pe-5 ps-5">
                        <GenericSearch fieldLabel={"Region"} options={regionOptions}/>
                    </Col>
                    <Col className="pe-5 ps-5">
                        <GenericSearch fieldLabel={"Advice Level"} options={adviceLevelOptions}/>
                    </Col>
                    <Col className="pe-5 ps-5">
                        <GenericSearch fieldLabel={"Travel Status"} options={travelStatusOptions}/>
                    </Col>
                </Row>
                <div style={{paddingBottom: '5%'}}>
                    <WhiteButton sx={{display: 'block', margin: 'auto', marginTop: '3%'}}>Search</WhiteButton>
                </div>  
            </div>
            
            <Row style={{"margin": "5%", "padding": '1%', "marginTop": "10vh"}}>
                {/* <Container fluid className="latest-updates"> */}
                <HeaderInfoRow/>
                <Container style={{height: '80vh', overflowY: 'scroll'}}>
                    {destinations.map((dest, idx) => {
                        return (
                            <InfoRow
                            key={idx}
                            code={dest.id}
                            country={dest.country}
                            updateDesc={dest.entry_description}
                            lastUpdated={getDate(dest.last_update)}
                            travelStatus={dest.travel_status}
                            saved={savedLocations.includes(dest.id)}
                            />
                            )
                        })}
                    </Container>
                {/* </Container> */}
            </Row>
            <Row className="map-section">
                <Typography variant="heading1">TRAVEL REGULATIONS MAP</Typography>
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
            <Row style={{marginTop: "15vh"}}>
                <Container fluid style={{margin: '8% 0%'}}>
                    <Row>
                        <Col md={4}>
                            <Image className="balloon-background" src={BalloonBackground}/>
                        </Col>
                        <Col md={7} style={{marginTop: 0}}>
                            <Typography variant="heading1">MOST POPULAR TRAVEL DESTINATIONS</Typography>
                            <HeaderInfoRow2/>
                            <Container style={{height: '55vh', overflowY: 'scroll', marginBottom: '3%'}}>
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
                            <DarkButton
                                sx={{display: 'block', margin: 'auto'}}
                                onClick={() => {
                                    navigate('/saved');
                                }}
                            >
                                Recommend me a destination
                            </DarkButton>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </div>
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
    { 'country': 'China', 'arrivals': 65700000, 'travelStatus': 'Closed' },
    { 'country': 'Italy', 'arrivals': 64500000, 'travelStatus': 'Open with Restrictions' },
    { 'country': 'Turkey', 'arrivals': 51200000, 'travelStatus': 'Open with Restrictions' },
    { 'country': 'Mexico', 'arrivals': 45000000, 'travelStatus': 'Open' },
    { 'country': 'Thailand', 'arrivals': 39800000, 'travelStatus': 'Open with Restrictions' },
    { 'country': 'Germany', 'arrivals': 396000000, 'travelStatus': 'Open with Restrictions' },
    { 'country': 'United Kingdom', 'arrivals': 39400000, 'travelStatus': 'Open' },
]
