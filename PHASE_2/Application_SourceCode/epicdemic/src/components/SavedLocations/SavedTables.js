import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col} from "react-bootstrap";
import InfoRow4 from "../DestinationFinder/InfoRow4";
import InfoRow5 from "../DestinationFinder/InfoRow5";
import HeaderInfoRow4 from "../DestinationFinder/HeaderInfoRow4";
import "../../styles/DestinationFinder.css";
import GenericSearchText from "../GenericSearchText";
import { Typography } from '@mui/material';
import { getDestination, getUpdates } from "../../apiCalls"
import PropTypes from 'prop-types';

function SavedTables (props) {
  SavedTables.propTypes = {locations: PropTypes.array}
  SavedTables.propTypes = {updates: PropTypes.array}
  const getDate = (date) => {
		const dateObj = new Date(date);
		return dateObj;
	}

  return (
    <>  
      {/* <Row style={{"marginTop": "4vh", "marginLeft": "5vw", "marginRight": "5vw"}}>
      <HeaderInfoRow4/>
      <Container style={{overflowY: 'scroll', maxHeight: '60vh', marginBottom: '5%'}}>
        {props.locations.map((loc, idx) => {
          return (
            <InfoRow4
            key={idx}
            code={loc.id}
            country={loc.country}
            updateDesc={loc.entry_description}
            lastUpdated={getDate(loc.last_update)}
            travelStat={loc.travel_status}
            saved={true}
            />
          )
        })}
      </Container>
    </Row> */}
    <Row>
      <Col style={{ marginBottom: '8vh', "paddingLeft": 0, "paddingRight": 0}}>
        {/* <Typography variant="heading2" className="color-dark-teal" sx={{textAlign: 'center'}}>Latest Updates</Typography> */}
        <Container fluid style={{overflowY: 'scroll', maxHeight: '60vh'}}>
          {props.updates.map((update, idx) => {
            return (
              <InfoRow5
                key={idx}
                code={update.location_id}
                country={update.country}
                desc={update.text}
                dateTime={getDate(update.date)}
                updateType={update.collection_type}
              />
            )
          })}
        </Container>
      </Col>
    </Row>
    </>
  )
}

export default SavedTables