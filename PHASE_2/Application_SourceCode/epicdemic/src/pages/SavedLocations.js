import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import HappyFamily from "../static/happyfamily.svg";
import BluePlus from "../static/blueplus.svg";
import InfoRow4 from "../components/DestinationFinder/InfoRow4";
import InfoRow5 from "../components/DestinationFinder/InfoRow5";
import HeaderInfoRow4 from "../components/DestinationFinder/HeaderInfoRow4";
import "../styles/DestinationFinder.css";
import GenericSearchText from "../components/GenericSearchText";
import NavbarComp from '../components/NavBar';
import { Typography } from '@mui/material';
import { getUserSaved, getDestination } from "../apiCalls"

const SavedLocations = () => {
    const [savedLocations, setSavedLocations] = React.useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await getUserSaved();
            setSavedLocations(data.saved_locations);
        }
        fetchData();
    }, []);

    let navigate = useNavigate();

    async function fetchDest(iso) {
        return await getDestination(iso);
    }

    return (
        <Container fluid style={{"overflowX": "hidden", "paddingLeft": 0, "paddingRight": 0, "marginLeft": 0, "marginRight": 0, "backgroundColor": "#EEF5FF"}}>
            <NavbarComp bg={true}></NavbarComp>
            <Row style={{"backgroundColor": "rgba(27, 73, 101, 0.7)"}}>
                <Col>
                    <Image style={{"width": "50vw"}} src={HappyFamily}/>
                </Col>
                <Col style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
                    <Row style={{"color": "white", "display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "center"}}>
                        <Typography variant="title">SAVED LOCATIONS AND UPDATES</Typography>
                        <Typography variant="heading3">Manage and view your saved locations as well as see all notifications</Typography>
                    </Row>
                </Col>
            </Row>
            <Row style={{"marginTop": "10vh", "marginLeft": "5vw", "marginRight": "5vw"}}>
                <Col style={{"marginBottom": "1vh"}}>
                    <Typography variant="heading2" style={{display: 'inline'}}>Your saved locations</Typography>
                    <Image height="60%" style={{"marginLeft": "2vw", "marginBottom": "1vh"}}src={BluePlus}/>
                </Col>
                <Col>
                    <GenericSearchText
                        fieldLabel="Search a saved location..."
                    />
                </Col>
                <HeaderInfoRow4/>
                <Container style={{overflowY: 'scroll', height: '60vh', marginBottom: '3%'}}>
                    {savedLocations.map((loc, idx) => {
                        const data = fetchDest(loc)
                        return (
                            <InfoRow4
                            key={idx}
                            country={data.country}
                            updateDesc={data.latestUpdate}
                            lastUpdated={data.lastUpdated}
                            travelStatus={data.travelStatus}
                            saved={true}
                            />
                        )
                    })}
                </Container>
            </Row>
            <Row style={{backgroundColor: '#0F83A0'}}>
                <Col style={{"marginTop": "5vh", marginBottom: '8vh', "paddingLeft": 0, "paddingRight": 0, "marginLeft": "25vw", "marginRight": "25vw"}}>
                    <Typography variant="heading2" className="color-white" sx={{textAlign: 'center'}}>Latest updates on your current and saved locations</Typography>
                    <Container fluid style={{overflowY: 'scroll', height: '60vh'}}>
                        {updatesRowData.map((row, idx) => {
                            return (
                                <InfoRow5
                                    key={idx}
                                    country={row.country}
                                    desc={row.desc}
                                    dateTime={row.dateTime}
                                />
                                )
                            })}
                    </Container>
                </Col>
            </Row>
            <Row position="relative" style={{"marginLeft": 0, "marginRight": 0, "marginTop": "10vh", "paddingBottom": "15vh", "paddingLeft": 0, "paddingRight": 0}}>
                <Col style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
                    <Button className="dest-search-button"
                        onClick={() => {
                            navigate('/finder')
                        }}
                    >
                        Destination search
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SavedLocations;


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

const updatesRowData = [
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
    { 'country': 'Australia', 'desc': 'Qantas set to bring back six new overseas routes as international borders gear up to reopen', 'dateTime': new Date(2022, 3, 22, 5, 9)},
]