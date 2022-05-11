import React, { useEffect } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useNavigate, } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import { Box } from "@mui/system";
import PropTypes from 'prop-types';
import { getUpdates } from "../../apiCalls";

function RestrictBox(props){
	RestrictBox.propTypes = {bgColor: PropTypes.string}
	RestrictBox.propTypes = {fontC: PropTypes.string}
	RestrictBox.propTypes = {country: PropTypes.string}
	RestrictBox.propTypes = {text: PropTypes.string}
	RestrictBox.propTypes = {date: PropTypes.string}
	RestrictBox.propTypes = {type: PropTypes.string}
	RestrictBox.propTypes = {code: PropTypes.string}

	let navigate = useNavigate(); 
	return (
		<Row className="mt-2 mb-3 py-3 px-4 border-radius-small" style={{backgroundColor: props.bgColor, boxShadow: '0px 1px 5px #CCCCCC'}}>
			<div className='d-flex'>
			<div className="pe-3 pt-1"> 
				<img
				loading="lazy"
				width="50"
				src={`https://flagcdn.com/w20/${props.code.toLowerCase()}.png`}
				srcSet={`https://flagcdn.com/w40/${props.code.toLowerCase()}.png 2x`}
				alt=""
				/>
			</div>
			<div style={{width: '100%', textAlign: 'left'}}>
				<Typography variant="heading3" sx={{color: props.fontC}}>{props.country}: New {props.type === "Others" ? 'conditions and' : props.type} rules</Typography>	
				<Box sx={{ display: 'flex'}}>
					<Typography variant="caption" sx={{color: props.fontC, flex: 1, justifyContent: 'flex-start', textAlign: 'left' }}>{props.date}</Typography>
					<Typography variant="caption" sx={{color: props.fontC, flex: 1, justifyContent: 'flex-end', textAlign: 'right', textDecoration: 'underline', cursor: 'pointer'}}
						onClick={() => {
							navigate(`/destination/${props.code}/travel`)
						}}
					>See more</Typography>
				</Box>
			</div>
			</div>
		</Row>
	);
}

function UpdateBar() {
	const mediumTeal = '#0F83A0';
	const darkTeal = '#1B4965';
	const lightBlue = '#E2F2FC';
	const [travelUpdates, setTravelUpdates] = React.useState([]);
	const [countryUpdates, setCountryUpdates] = React.useState([]);
	useEffect(() => {
		async function fetchTravelData () {
			const data = await getUpdates("", "document,testing,quarantine", 1, 5);
			setTravelUpdates(data.updates);
		}
		async function fetchSafetyData () {
			const data = await getUpdates("", "mask,Others,tracing,policies", 1, 5);
			setCountryUpdates(data.updates);
		}
		fetchTravelData();
		fetchSafetyData();
	}, []);

	const getDateString = (date) => {
		const dateObj = new Date(date);
		return dateObj.toDateString();
	}

	return(
		<Col md={10} className="pt-4 text-center">
			<Typography variant="heading1" className="color-dark-teal">LATEST UPDATES</Typography>
			<div className="d-flex flex-row justify-content-center ms-5 me-5">
				<div className="m-4 col-6">
					<Typography variant="heading2" className="color-dark-teal">Travel Requirements</Typography>
					{travelUpdates.map((updates, idx) => {
                        return (
                            <RestrictBox
                            key={idx}
							bgColor={lightBlue}
							fontC={darkTeal}
                            country={updates.country}
                            text={updates.text}
                            date={getDateString(updates.date)}
							type={updates.collection_type}
							code={updates.location_id}
                            />
                        )
                    })}
				</div>
				<div className="m-4 col-6">
					<Typography variant="heading2" className="color-dark-teal">Country Policies</Typography>
					{countryUpdates.map((updates, idx) => {
                        return (
                            <RestrictBox
                            key={idx}
							bgColor='white'
							fontC={darkTeal}
                            country={updates.country}
                            text={updates.text}
                            date={getDateString(updates.date)}
							type={updates.collection_type}
							code={updates.location_id}
                            />
                        )
                    })}
				</div>
			</div>
		</Col>
	)
}

export default UpdateBar