import { Navbar, Container, InputGroup, FormControl } from "react-bootstrap";

function Home() {
  return (
    <Container>
      <Navbar fixed="top" bg="dark">
        <Container>
          <InputGroup>
            <InputGroup.Text id="from-search-icon">a</InputGroup.Text>
            <FormControl
              placeholder="From"
              aria-describedby="from-search-icon"
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text id="dest-search-icon">a</InputGroup.Text>
            <FormControl
              placeholder="Destination"
              aria-describedby="dest-search-icon"
            />
          </InputGroup>
        </Container>
      </Navbar>      
    </Container>
  );
}

export default Home;
