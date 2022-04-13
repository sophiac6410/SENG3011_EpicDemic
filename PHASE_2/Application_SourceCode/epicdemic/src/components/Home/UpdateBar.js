import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
// import "../../styles/Home.css"
import Typography from '@mui/material/Typography'
import { Box } from "@mui/system";
import PropTypes from 'prop-types';


function RestrictBox(props){
	RestrictBox.propTypes = {bgColor: PropTypes.string}
	RestrictBox.propTypes = {fontC: PropTypes.string}
	return (
		<Row className="mt-2 mb-3 py-3 px-4 border-radius-small" style={{backgroundColor: props.bgColor, boxShadow: '0px 1px 5px #CCCCCC'}}>
			<div className="justify-content-start mb-2">
				<Typography variant="heading3" sx={{color: props.fontC}}>New travel rules and conditions for Philippines</Typography>	
			</div>
			<Box sx={{ display: 'flex'}}>
				<Typography variant="caption" sx={{color: props.fontC, flex: 1, justifyContent: 'flex-start', textAlign: 'left' }}>28th March 2022 10:00 AM</Typography>
				<Typography variant="caption" sx={{color: props.fontC, flex: 1, justifyContent: 'flex-end', textAlign: 'right', textDecoration: 'underline'}}>See more</Typography>
			</Box>
		</Row>
	);
}

function UpdateBar() {
	const mediumTeal = '#0F83A0';
	const darkTeal = '#1B4965';
	return(
		<Col md={10} className="pt-4 text-center justify-content-center">
			<Typography variant="heading1" className="color-dark-teal">LATEST UPDATES</Typography>
			<div className="d-flex">
				<div className="m-4">
					<Typography variant="heading2" className="color-dark-teal">Travel</Typography>
					<RestrictBox bgColor={mediumTeal} fontC='white'></RestrictBox>
					<RestrictBox bgColor={mediumTeal} fontC='white'></RestrictBox>
					<RestrictBox bgColor={mediumTeal} fontC='white'></RestrictBox>
					<RestrictBox bgColor={mediumTeal} fontC='white'></RestrictBox>
				</div>
				<div className="m-4">
					<Typography variant="heading2" className="color-dark-teal">Safety and Diseases</Typography>
					<RestrictBox bgColor='white' fontC={darkTeal}></RestrictBox>
					<RestrictBox bgColor='white' fontC={darkTeal}></RestrictBox>
					<RestrictBox bgColor='white' fontC={darkTeal}></RestrictBox>
					<RestrictBox bgColor='white' fontC={darkTeal}></RestrictBox>
				</div>
			</div>
		</Col>
	)
}

export default UpdateBar