import React, { useState, useEffect } from "react";
import { useNavigate, } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import WorldMap from "../static/hexworldmap.svg";
import "../styles/DestinationFinder.css";
import GenericSearch from "../components/GenericSearch";
import NavbarComp from "../components/NavBar";
import Typography from '@mui/material/Typography';
import { getAllLocations, getUserSaved } from "../apiCalls";
import { travelStatus, adviceLevel } from "../styles/Theme";
import CountryCard from "../components/DestinationFinder/CountryCard.js"
import Search from "../components/Home/Search";
import CountrySelect from "../components/Home/CountrySearchBox";
import CountrySearch from "../components/DestinationFinder/CountrySearch"
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';


const allCountries = [];

const DestinationFinder = () => {
    const [countries, setCountries] = useState([]);
    const [savedLocations, setSavedLocations] = useState([]);
    const [searchFilter, setSearchFilter] = useState({
        "region": null,
        "advice": null,
        "travel": null,
        "country": null
    });

    let navigate = useNavigate(); 

    useEffect(() => {
        async function fetchData () {
            let locations = await getAllLocations();
            console.log(locations);
            for (var country of locations) {
                allCountries.push({...country})
            }
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

    const filterCountries = () => {
        var filtered = [];
    
        for (var country of allCountries) {
            filtered.push({...country})
        }

        if (searchFilter.region === null && searchFilter.travel === null && searchFilter.advice === null && searchFilter.country === null) {
            setCountries(filtered);
        }        
        
        if (searchFilter.region !== null) {
            filtered = filtered.filter((country) => {
                return country.region === searchFilter.region.label
            })
        }

        if (searchFilter.travel !== null) {
            filtered = filtered.filter((country) => {
                return travelStatus(country.travel_status) === searchFilter.travel.label
            })
        }

        if (searchFilter.advice !== null) {
            filtered = filtered.filter((country) => {
                return adviceLevel(country.advice_level) === searchFilter.advice.label
            })
        }

        if (searchFilter.country !== null) {
            filtered = filtered.filter((country) => {
                return country.country === searchFilter.country.label
            })
        }

        setCountries(filtered);
    }

    return (
        <div className="bg-off-white">
            <div className="bg-plane"/>
            <NavbarComp bg={false}/>
            <div style={{height: "40vh", position: "relative"}}>
                <div className="text-center mb-5" style={{ marginTop: "10vh" }}>
                    <Typography variant="title" className="color-white mt-5">WHERE WILL YOU GO NEXT?</Typography>
                </div>
                
                <div className="border-radius-large searchfield-container ps-5 pe-5">
                    <div style={{ display: "flex", backgroundColor: "white", padding: "3px 15px", borderRadius: "30px" }}>
                        <CountrySearch handleInput={(e, v) => updateSearch("country", v)}></CountrySearch>
                        {/* <div className="bg-dark-teal border-radius-med text-center"> */}
                            <IconButton
                                aria-label="search"
                                sx={{ borderRadius: "25px", backgroundColor: "#1B4965" }}
                                onClick={filterCountries}
                            >
                                <SearchIcon sx={{ color: "white", padding: 0, fontSize: 20, m: 1}}/>
                            </IconButton>
                        {/* </div> */}
                    </div>
                </div>

                <div className="text-center mb-5" style={{ position: "absolute", margin: "auto", bottom: "3vh", left: 0, right: 0, marginLeft: "5%", marginRight: "5%"}}>
                    <Typography variant="title" className="color-white mt-5">OR FIND A DESTINATION BY...</Typography>
                </div>

                <div style={{backgroundColor: "white", padding: "15px 30px", position: "absolute", bottom: "-5vh", margin: "auto", left: 0, right: 0, marginLeft: "5%", marginRight: "5%", borderRadius: "20px", boxShadow: "0px 0px 12px 0px black" }}>
                    <Row className="justify-content-center">
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
            </div>
            
            <Row style={{"marginLeft": "6vw", "marginRight": "6vw", "marginTop": "10vh", "marginBottom": "10vh"}}>
                <div className="image-gallery">
                    {countries.map((country, idx) => {
                        return(<CountryCard key={country.id} code={country.id} country={country.country} status={country.travel_status} saved={savedLocations.includes(country.id)}/>)
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
    { code: 'NA', label: 'North America', imageUrl: 'test' },
    { code: 'AF', label: 'Africa', imageUrl: 'test' },
]

const adviceLevelOptions = [
    { code: '0', label: 'Regular Precautions', imageUrl: 'test' },
    { code: '1', label: 'Exercise Caution', imageUrl: 'test' },
    { code: '2', label: 'Reconsider your need for travel', imageUrl: 'test' },
    { code: '3', label: 'Do not travel', imageUrl: 'test' },
]

const travelStatusOptions = [
    { code: 'O', label: 'Open', imageUrl: 'test' },
    { code: 'R', label: 'Open with Restrictions', imageUrl: 'test' },
    { code: 'C', label: 'Closed', imageUrl: 'test' }
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
