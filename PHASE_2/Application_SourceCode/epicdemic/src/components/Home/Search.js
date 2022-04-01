import {InputGroup, FormControl, Row, Col } from "react-bootstrap";
import CountrySelect from "./CountrySearchBox";
import "react-multi-carousel/lib/styles.css";
import arrow from '../../static/arrow.svg'

function Search() {
    return(
      <div style={{"background-color": "#7EB2FF", padding: '20px', borderRadius: '25px'}}>
        <div className="search-row">
          <div className="search-col">
            <div className="search-bar-text">Departure:</div>
            <div className="searchfield-container">
              <CountrySelect fieldLabel={"Choose a country"}></CountrySelect>
            </div>
          </div>
          <div className="search-col">
            <img src={arrow} alt="arrow" width="100px" height="50px"></img>
          </div>
          <div className="search-col">
            <div className="search-bar-text">Arrival:</div>
            <div className="searchfield-container">
              <CountrySelect fieldLabel={"Choose a country"}></CountrySelect>
            </div>
          </div>
        </div>
        <div className="search-text">
          <a>I don't know where to go?</a>
        </div>
    </div>
    )
}

export default Search