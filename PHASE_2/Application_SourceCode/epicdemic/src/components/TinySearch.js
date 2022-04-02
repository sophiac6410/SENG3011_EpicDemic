import {InputGroup, FormControl, Row, Col, Image } from "react-bootstrap";
import TinyCountrySelect from "./TinyCountrySelect";
import "react-multi-carousel/lib/styles.css";
import arrow from '../static/arrow.svg'
import '../styles/Destination.css'


function TinySearch() {
    return(
      <Row className="p-4 bg-lightblue justify-content-end align-items-center">
        <Col md={3}>
          <div className="bg-white search-container p-1 ps-2 pe-3">
            <TinyCountrySelect fieldLabel={"Australia"}></TinyCountrySelect>
          </div>
        </Col>
        <Col md={1} className="text-center">
          <Image src={arrow} alt="arrow" width="80px" height="50px"></Image>
        </Col>
        <Col md={3} className="bg-white search-container p-1 ps-2 pe-3">
          <div>
            <TinyCountrySelect fieldLabel={"Philippines"}></TinyCountrySelect>
          </div>
        </Col>
    </Row>
    )
}

export default TinySearch