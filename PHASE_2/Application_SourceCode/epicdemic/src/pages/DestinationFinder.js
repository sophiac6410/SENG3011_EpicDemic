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
import { travelStatus } from "../styles/Theme";
import CountryCard from "../components/DestinationFinder/CountryCard.js"


const DestinationFinder = () => {
    const [countries, setCountries] = useState([]);
    const [savedLocations, setSavedLocations] = useState([]);
    const [searchFilter, setSearchFilter] = useState({
        "region": null,
        "advice": null,
        "travel": null,
    });

    let navigate = useNavigate(); 

    useEffect(() => {
        async function fetchData () {
            let locations = await getAllLocations();
            console.log(locations);
            setCountries(locations);
            
            let user = await getUserSaved();
            setSavedLocations(user.saved_locations);
            console.log('================');
            console.log(user.saved_locations);
        }
        fetchData();
    }, []);

    const updateSearch = (k, v) => {
        var newSearch = {...searchFilter}
        newSearch[k] = v;
        setSearchFilter(newSearch);
    }

    return (
        <div className="bg-off-white">
            <div className="bg-plane"/>
            <NavbarComp bg={false}/>
            <div style={{position: "relative"}}>
                <div className="text-center mb-5" style={{ marginTop: "10vh" }}>
                    <Typography variant="title" className="color-white mt-5">WHERE WILL YOU GO NEXT?</Typography>
                </div>
                
                <WhiteButton onClick={() => console.log(searchFilter)} sx={{display: 'block', margin: 'auto', marginTop: '3%'}}>Search</WhiteButton>

                <Row style={{margin: "3% 5% 1%"}} className="justify-content-center">
                    <Col className="pe-5 ps-5">
                        <GenericSearch fieldLabel={"Region"} options={regionOptions} handleInput={(e, v) => updateSearch("region", v)}/>
                    </Col>
                    <Col className="pe-5 ps-5">
                        <GenericSearch fieldLabel={"Advice Level"} options={adviceLevelOptions} handleInput={(e, v) => updateSearch("advice", v)}/>
                    </Col>
                    <Col className="pe-5 ps-5">
                        <GenericSearch fieldLabel={"Travel Status"} options={travelStatusOptions} handleInput={(e, v) => updateSearch("travel", v)}/>
                    </Col>
                </Row>
            </div>
            
            <Row style={{"marginLeft": "6vw", "marginRight": "6vw", "marginTop": "10vh", "marginBottom": "10vh"}}>
                <div className="image-gallery">
                    {countries.map((country, idx) => {
                        return(<CountryCard code={country.id} country={country.country} status={country.travel_status} saved={savedLocations.includes(country.id)}/>)
                    })}
                </div>
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
