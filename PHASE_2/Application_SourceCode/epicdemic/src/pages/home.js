import {Container} from "react-bootstrap";
import LocationBar from "../components/LocationBar";
import Search from "../components/Search";

function Home() {
  return (
      <Container style={{"background-color": "#3F3CB0"}}>
        <Search></Search>
        <LocationBar></LocationBar> 
      </Container>
  );
}

export default Home;
