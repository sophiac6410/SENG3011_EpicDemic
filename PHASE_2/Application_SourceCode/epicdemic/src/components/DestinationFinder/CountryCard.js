import React, {useState, useEffect} from "react";
import { Card, Image, Badge } from "react-bootstrap";
import { travelStatus, travelStatusColor} from "../../styles/Theme.js";
import "../../styles/CountryCard.css";

const CountryCard = ({code, country, status}) => {
    const [travel, setTravel] = useState({});

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
        console.log("tStatusColor = " + tStatusColor);
        console.log("colorClass = " + colorClass);
        setTravel({
            tStatus: travelStatus(status),
            tStatusColor: colorClass
        });
    }, [])

    return (
        <Card style={{ "width": "18vw", "height": "18vw", "borderRadius": "20px"}}>
            <img src={require('../../static/countryCardPics/' + country + '.png')}
                style={{ "width": "18vw", "height": "12vw", "objectFit": "cover", "borderTopLeftRadius": "20px", "borderTopRightRadius": "20px" }}
            />
            <Card.Footer style={{"height": "6vw"}}>
                <b style={{fontSize: "18px"}}>{country}</b>
                <br/>
                <Badge className={travel.tStatusColor} pill>
                    {travel.tStatus}
                </Badge>
                <br/>
                <text style={{ fontSize: "12px", fontWeight: "lighter", position: "absolute", bottom: 0, right: 0, paddingBottom: "1.5%", paddingRight: "1.5%"}}>
                    Last updated {new Date().toLocaleString('en-us', {day: 'numeric', month: 'short', year: 'numeric'})}
                </text>
            </Card.Footer>
        </Card>
    )
}

export default CountryCard;