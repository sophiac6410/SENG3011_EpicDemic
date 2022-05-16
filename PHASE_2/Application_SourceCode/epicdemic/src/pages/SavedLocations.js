import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import HappyFamily from "../static/happyfamily.svg";
import HappyFamily2 from './savedLocationBg.png'
import BluePlus from "../static/blueplus.svg";
import InfoRow4 from "../components/DestinationFinder/InfoRow4";
import InfoRow5 from "../components/DestinationFinder/InfoRow5";
import HeaderInfoRow4 from "../components/DestinationFinder/HeaderInfoRow4";
import "../styles/DestinationFinder.css";
import GenericSearchText from "../components/GenericSearchText";
import NavbarComp from '../components/NavBar';
import { Typography } from '@mui/material';
import { getUserSaved, getDestination, getUpdates } from "../apiCalls"
import SavedTables from "../components/SavedLocations/SavedTables"
import LocationBar from '../components/Home/LocationBar';

const SavedLocations = () => {
    const [savedLocations, setSavedLocations] = React.useState([]);
    const [updates, setUpdates] = React.useState([]);
    const [locationDetails, setLocationDetails] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            const dataSaved = await getUserSaved();
            setSavedLocations(dataSaved.saved_locations);
            const dataUpdates = await getUpdates(dataSaved.saved_locations.join(","), "", null, null);
            setUpdates(dataUpdates.updates);
            let locArray = [];
            for (let index = 0; index < dataSaved.saved_locations.length; index++) {
                const loc = dataSaved.saved_locations[index];
                const dataDest = await getDestination(loc);
                locArray.push(dataDest);
            }
            setLocationDetails(locArray);
  
        }
        fetchData();
    }, []);

    let navigate = useNavigate();

    return (
        <Container fluid style={{"overflowX": "hidden", "paddingLeft": 0, "paddingRight": 0, "marginLeft": 0, "marginRight": 0, "backgroundColor": "#EEF5FF"}}>
            <NavbarComp bg={true}></NavbarComp>
            <div style={{backgroundImage: `url(${HappyFamily2})`, backgroundSize: 'cover', height: '400px'}}>
                <div className="bg-dark-teal d-flex justify-content-center align-items-center" style={{opacity: 0.8, height: '100%'}}>
                <div className="color-white py-5">
                    <Typography variant="title">SAVED LOCATIONS AND UPDATES</Typography>
                    <Typography variant="heading3">Manage and view your saved locations as well as see all notifications</Typography>
                </div>
                </div>
            </div>
            <Row style={{"marginTop": "10vh", "marginLeft": "8vw", "marginRight": "8vw"}}>
                <Col>
                    <Typography variant="heading2" style={{display: 'inline'}}>Your saved locations</Typography>
                    {/* <Image height="60%" style={{"marginLeft": "2vw", "marginBottom": "1vh", cursor: 'pointer'}} src={BluePlus} onClick={() => {
                            navigate('/finder')
                        }}/> */}
                </Col>
                {savedLocations !== [] &&
                <Col>
                    <GenericSearchText
                    fieldLabel="Search a saved location..."
                    />
                </Col>
                }
            </Row>
            <LocationBar locations={savedLocations}></LocationBar>
            {savedLocations === []
            ? <></>
            : <>
                <Row className="mb-0 p-0" style={{"marginTop": "10vh", "marginLeft": "8vw", "marginRight": "8vw"}}>
                    <Typography variant="heading2" sx={{p: 0}}>Latest updates</Typography>
                    <SavedTables locations={locationDetails} updates={updates} />
                </Row>
            </>
            }
        </Container>
    );
}

export default SavedLocations;
