import {Container, Col, Row, Image} from "react-bootstrap";
import AirUpdateBar from "../components/AirUpdateBar";
import GlobalUpdate from "../components/GlobalUpdate";
import LocationBar from "../components/LocationBar";
import NewsBar from "../components/NewsBar";
import Search from "../components/Search";
import UpdateBar from "../components/UpdateBar";
import bigLoading from "../static/bigLoading.svg"

function Home() {
  return (
      <Container style={{"background-color": "white"}}>
        <Row>
          <div id="header">
            <Search></Search>
          </div>
        </Row>
        <NewsBar></NewsBar>
        <LocationBar></LocationBar>
        <Row className="mt-5 mb-5 p-1 ps-3 align-items-center justify-content-center">
          <Col md={4} className="text-center justify-content-center p-2">
            <Image width="250px" height="250px" classname="text-center" src={bigLoading}></Image>
          </Col>
          {/* <AirUpdateBar></AirUpdateBar> */}
          <UpdateBar></UpdateBar>
        </Row>
        <GlobalUpdate></GlobalUpdate>
      </Container>
  );
}

export default Home;
