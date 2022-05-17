import React, {useState, useEffect} from "react";
import { Card, Image, Badge } from "react-bootstrap";
import { travelStatus, travelStatusColor} from "../../styles/Theme.js";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import "../../styles/CountryCard.css";
import { getDestination, saveDestination } from "../../apiCalls";
import { Typography } from "@mui/material";

const CountryCard = ({code, country, status, saved}) => {
    const [travel, setTravel] = useState({});
    const [isSaved, setSaved] = React.useState(saved);
    const handleClickSave = (event) => {
        let method;
        if (isSaved) {
            method = 'DELETE';
        } else {
            method = 'PUT';
        }
        saveDestination(method, code);
        setSaved(event.target.checked); 
    }
    useEffect(() => {
        console.log("status is " + status);
        var tStatusColor = travelStatusColor(status);
        var colorClass;
        if (tStatusColor === "#1CC02C") {
            colorClass = "green";
        } else if (tStatusColor === "#FFA800") {
            colorClass = "orange";
        } else if (tStatusColor === "#DA4848") {
            colorClass = "red";
        }
        setTravel({
            tStatus: travelStatus(status),
            tStatusColor: colorClass
        });
    }, [])

    return (
        <Card style={{ "width": "18vw", "height": "18vw", "borderRadius": "20px", cursor: 'pointer'}}>
            <img src={require('../../static/countryCardPics/' + country + '.png')}
                style={{ "width": "18vw", "height": "12vw", "objectFit": "cover", "borderTopLeftRadius": "20px", "borderTopRightRadius": "20px" }}
            />
            <Card.Footer style={{"height": "6vw", position: "relative"}}>
                <b style={{fontSize: "18px"}}>{country}</b>
                <div style={{ position: "absolute", top: 0, right: 0, paddingTop: "1.5%", paddingRight: "1.5%"}}>
                    <Checkbox checked={isSaved} icon={<FavoriteBorder className="color-medium-teal"/>} checkedIcon={<Favorite className="color-medium-teal" />} onClick={handleClickSave} />
                </div>
                {/* {saved ? <FavoriteIcon fontSize="large" sx={{color: "#62B6CB"}} style={{ position: "absolute", top: 0, right: 0, paddingTop: "1.5%", paddingRight: "1.5%"}}/> : <FavoriteBorderOutlinedIcon fontSize="large" sx={{color: "#62B6CB"}} style={{ position: "absolute", top: 0, right: 0, paddingTop: "1.5%", paddingRight: "1.5%"}}/>} */}
                <br/>
                <Badge className={travel.tStatusColor} pill>
                    {travel.tStatus}
                </Badge>
                <br/>
                <div style={{ position: "absolute", bottom: 0, right: 0, marginTop: '1%', paddingBottom: "1.5%", paddingRight: "1.5%"}}>
                <Typography variant="caption">
                    Last updated {new Date().toLocaleString('en-us', {day: 'numeric', month: 'short', year: 'numeric'})}
                </Typography>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default CountryCard;