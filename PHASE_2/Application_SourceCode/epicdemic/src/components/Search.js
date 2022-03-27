import {InputGroup, FormControl, Row, Col } from "react-bootstrap";
import CountrySelect from "./CountrySearchBox";
import "react-multi-carousel/lib/styles.css";
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    return(
      <Row className="p-4" style={{"background-color": "#726FE7"}}>
      <Col>
        {/* <InputGroup>
          <InputGroup.Text id="from-search-icon">a</InputGroup.Text>
          <FormControl
            placeholder="From"
            aria-describedby="from-search-icon"
          />
        </InputGroup> */}
        <div className="search-bar-text">From:</div>
        <div className="searchfield-container">
          <div className="search-icon">
            <SearchIcon fontSize="large"></SearchIcon>
          </div>
          <CountrySelect fieldLabel={"Choose a country"}></CountrySelect>
        </div>
      </Col>
      <Col>
        {/* <InputGroup>
          <InputGroup.Text id="dest-search-icon">a</InputGroup.Text>
          <FormControl
            placeholder="Destination"
            aria-describedby="dest-search-icon"
          />
        </InputGroup> */}
        <div className="search-bar-text">To:</div>
        <div className="searchfield-container">
          <div className="search-icon">
            <SearchIcon fontSize="large"></SearchIcon>
          </div>
          <CountrySelect fieldLabel={"Choose a country"}></CountrySelect>
        </div>
      </Col>
    </Row>
    )
}

export default Search