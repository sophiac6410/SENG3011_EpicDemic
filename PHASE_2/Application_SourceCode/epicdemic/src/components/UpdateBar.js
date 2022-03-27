import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import info from "../static/info.svg"
import "../styles/Home.css"


class RestrictBox extends React.Component {
  render() {
		return (
			<Row className="justify-content-start bg-lightpurple mt-2 mb-3 pt-2 pb-2">
				<Col md={2}>
					<Row className="justify-content-end mt-3">
						<img src={info} width="35px" height="35px"></img>
					</Row>
				</Col>
				<Col>
					<div className="mb-2 mt-2" style={{"color": "white", "font-size": "21px"}}>New travel rules and conditions for Philippines</div>
					<Row className="space-between mb-1 mt-2 pe-4">
						<Col style={{"color": "white", "font-size": "10px"}}>23.03.22</Col>
						<Col style={{"color": "white", "font-size": "10px"}}>
							<Row className="justify-content-end">See latest updates</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		);
 }
}

class UpdateBar extends React.Component {
  render() {
    return(
        <Col md={5} className="ms-4">
          <RestrictBox></RestrictBox>
          <RestrictBox></RestrictBox>
          <RestrictBox></RestrictBox>
          <RestrictBox></RestrictBox>
        </Col>
    )
  }
}

export default UpdateBar