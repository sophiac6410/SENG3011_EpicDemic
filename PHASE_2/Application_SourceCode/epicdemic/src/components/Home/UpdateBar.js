import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import info from "../../static/info.svg"
// import "../../styles/Home.css"
import Typography from '@mui/material/Typography'


function RestrictBox(){
	return (
		<Row className="justify-content-start bg-mblue mt-2 mb-3 pt-2 pb-2" style={{"border-radius": "10px"}}>
			<Col md={2} className="align-self-center">
				<Row className="justify-content-end">
					<img src={info} width="50px" height="50px"></img>
				</Row>
			</Col>
			<Col>
				<div className="mb-2 mt-1" style={{"color": "white", "font-size": "20px", "font-weight": "bold"}}>New travel rules and conditions for Philippines</div>
				<Row className="space-between mb-1 mt-2 pe-4">
					<Col style={{"color": "white", "font-size": "12px"}}>28th March 2022 10:00 AMs</Col>
					<Col style={{"color": "white", "font-size": "12px"}}>
						<Row className="justify-content-end">See latest updates</Row>
					</Col>
				</Row>
			</Col>
		</Row>
	);
}

function UpdateBar() {
	return(
		<Col md={7} className="pt-4">
			<Typography variant="heading1" className="color-dark-teal">LATEST GLOBAL TRAVEL UPDATES</Typography>
			<RestrictBox></RestrictBox>
			<RestrictBox></RestrictBox>
			<RestrictBox></RestrictBox>
			<RestrictBox></RestrictBox>
		</Col>
	)
}

export default UpdateBar