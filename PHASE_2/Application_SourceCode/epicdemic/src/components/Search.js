import {InputGroup, FormControl, Row, Col } from "react-bootstrap";
import CountrySelect from "./CountrySearchBox";
import "react-multi-carousel/lib/styles.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import arrow from '../static/arrow.svg'

function Search() {
    return(
      <Row className="p-4" style={{"background-color": "#726FE7"}}>
        <div className="search-row">
          <div className="search-col">
            <div className="search-bar-text">From:</div>
            <div className="searchfield-container">
              <CountrySelect fieldLabel={"Choose a country"}></CountrySelect>
            </div>
          </div>
          <div className="search-col">
            <img src={arrow} alt="arrow" width="100px" height="40px"></img>
          </div>
          <div className="search-col">
            <div className="search-bar-text">Destination:</div>
            <div className="searchfield-container">
              <CountrySelect fieldLabel={"Choose a country"}></CountrySelect>
            </div>
          </div>
        </div>
    </Row>
    )
}

export default Search