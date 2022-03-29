import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import info from "../static/info.svg"
import "../styles/Home.css"


function RestrictBox(){
	return (
		<Row className="justify-content-start bg-lightpurple mt-2 mb-3 pt-2 pb-2">
			<Col md={2} className="align-self-center">
				<Row className="justify-content-end">
					<img src={info} width="35px" height="35px"></img>
				</Row>
			</Col>
			<Col>
				<div className="mb-2 mt-1" style={{"color": "white", "font-size": "20px"}}>New travel rules and conditions for Philippines</div>
				<Row className="space-between mb-1 mt-2 pe-4">
					<Col style={{"color": "white", "font-size": "12px"}}>23.03.22</Col>
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
		<Col md={5}>
			<RestrictBox></RestrictBox>
			<RestrictBox></RestrictBox>
			<RestrictBox></RestrictBox>
			<RestrictBox></RestrictBox>
		</Col>
	)
}

export default UpdateBar