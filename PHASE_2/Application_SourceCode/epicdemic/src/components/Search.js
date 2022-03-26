import {InputGroup, FormControl, Row, Col } from "react-bootstrap";

function Search() {
    return(
      <Row className="p-4" style={{"background-color": "#726FE7"}}>
      <Col>
        <InputGroup>
          <InputGroup.Text id="from-search-icon">a</InputGroup.Text>
          <FormControl
            placeholder="From"
            aria-describedby="from-search-icon"
          />
        </InputGroup>
      </Col>
      <Col>
        <InputGroup>
          <InputGroup.Text id="dest-search-icon">a</InputGroup.Text>
          <FormControl
            placeholder="Destination"
            aria-describedby="dest-search-icon"
          />
        </InputGroup>
      </Col>
    </Row>
    )
}

export default Search