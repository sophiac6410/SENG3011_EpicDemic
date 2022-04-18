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
import { getUserSaved, getDestination, getUpdates } from "../apiCalls"
import SavedTables from "../components/SavedLocations/SavedTables"

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
            {savedLocations === []
            ? <Typography variant="heading3" className="color-dark-grey">You have no saved locations</Typography>
            : <SavedTables locations={locationDetails} updates={updates} />
            }
            <Row position="relative" style={{"marginLeft": 0, "marginRight": 0, "marginTop": "10vh", "paddingBottom": "15vh", "paddingLeft": 0, "paddingRight": 0}}>
                <Col style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
                    <Button className="dest-search-button"
                        onClick={() => {
                            navigate('/finder')
                        }}
                    >
                        Find a Destination
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SavedLocations;
