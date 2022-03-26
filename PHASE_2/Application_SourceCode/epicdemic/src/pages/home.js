import {Container} from "react-bootstrap";
import LocationBar from "../components/LocationBar";
import NewsBar from "../components/NewsBar";
import Search from "../components/Search";

function Home() {
  return (
      <Container style={{"background-color": "#3F3CB0"}}>
        <Search></Search>
        <NewsBar></NewsBar>
        <LocationBar></LocationBar> 
      </Container>
  );
}

export default Home;
