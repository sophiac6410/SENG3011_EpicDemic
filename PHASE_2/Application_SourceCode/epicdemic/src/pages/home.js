import { Navbar, Container, InputGroup, FormControl, Row, Col } from "react-bootstrap";

function Home() {
  return (
      <Container>
        <Row mt={10}>
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
      </Container>
  );
}

export default Home;
