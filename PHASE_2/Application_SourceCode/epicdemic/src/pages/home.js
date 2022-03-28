import {Container, Col, Row} from "react-bootstrap";
import AirUpdateBar from "../components/AirUpdateBar";
import GlobalUpdate from "../components/GlobalUpdate";
import LocationBar from "../components/LocationBar";
import Search from "../components/Search";
import UpdateBar from "../components/UpdateBar";

function Home() {
  return (
      <Container style={{"background-color": "#3F3CB0"}}>
        <Search></Search>
        <LocationBar></LocationBar>
        <Row className="mt-3 p-1 ps-3">
          <div className="sub-title mb-2">Latest travel updates on your current and saved locations</div>
          <Row>
            <UpdateBar></UpdateBar>
            <AirUpdateBar></AirUpdateBar>
          </Row>
          <GlobalUpdate></GlobalUpdate>
        </Row>
      </Container>
  );
}

export default Home;
