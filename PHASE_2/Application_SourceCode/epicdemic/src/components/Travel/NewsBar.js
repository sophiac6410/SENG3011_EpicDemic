import React from "react";
// import { Carousel } from 'react-responsive-carousel';
import "../../styles/Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import { Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import NewsCard from "../Home/NewsCard";
import globe from '../../static/globe.svg'
import '../../styles/Destination.css'
import { Typography } from '@mui/material';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const colours = [ '#1B4965', 'white', '#E2F2FC' ]
const fontColours = [ 'white', '#1B4965', '#1B4965' ]

const news = [
  {
    'title': "The Americas and Asia Pacific regions show increased hotel pipeline activity",
    'date': "16 May 2022",
    'link': 'https://www.traveldailynews.com/post/the-americas-and-asia-pacific-regions-show-increased-hotel-pipeline-activity'
  },
  {
    'title': "Trends shaping 2022 travel recovery revealed in new Skyscanner report",
    'date': "13 May 2022",
    'link': 'https://www.traveldailynews.com/post/trends-shaping-2022-travel-recovery-revealed-in-new-skyscanner-report'
  },
  {
    'title': "Travellers hit by lengthy lines at Sydney Airport again",
    'date': "09 May 2022",
    'link': 'https://www.9news.com.au/national/sydney-airport-delays-domestic-international-no-staff/4d18de11-03be-4ec9-bd97-5c5ebac5a992'
  },
  {
    'title': "Passenger taken into custody after opening emergency exit and walking on wing of plane",
    'date': "07 May 2022",
    'link': 'https://www.9news.com.au/world/us-travel-flight-passenger-taken-into-custody-after-opening-emergency-exit-walking-on-wing-of-plane/c30e03c3-fc2d-4286-a949-6e35fe546af3'
  },
  {
    'title': "How private aviation will redefine the air travel experience in 2022",
    'date': "03 May 2022",
    'link': 'https://www.traveldailynews.com/post/how-private-aviation-will-redefine-the-air-travel-experience-in-2022'
  },
  {
    'title': "Australia scraps COVID-19 testing for international arrivals",
    'date': "30 Apr 2022",
    'link': 'https://www.9news.com.au/national/covid-19-australia-stops-all-coronavirus-testing-for-international-arrivals/a01f0f72-27ab-40d3-a56e-9251b13cbabf'
  }
]

class NewsBar extends React.Component {
  render() {
    return(
      <Row className="mt-5 pt-5 mb-5">
        <Typography variant="heading2" className="py-2" sx={{textAlign: 'center'}}>LATEST NEWS</Typography>
        <div>
          <Carousel 
            swipeable={true}
            showStatus={false}
            responsive={responsive} 
          >
              <NewsCard col={colours[0]} fontC={fontColours[0]} title={news[0].title} link={news[0].link} date={news[0].date}></NewsCard>
              <div className="news-container-col">
                <NewsCard col={colours[1]} fontC={fontColours[1]} title={news[1].title} link={news[1].link} date={news[1].date}></NewsCard>
                <NewsCard col={colours[2]} fontC={fontColours[2]} title={news[2].title} link={news[2].link} date={news[2].date}></NewsCard>
              </div>
              <NewsCard col={colours[0]} fontC={fontColours[0]} title={news[3].title} link={news[3].link} date={news[3].date}></NewsCard>
              <div className="news-container-col">
                <NewsCard col={colours[1]} fontC={fontColours[1]} title={news[4].title} link={news[4].link} date={news[4].date}></NewsCard>
                <NewsCard col={colours[2]} fontC={fontColours[2]} title={news[5].title} link={news[5].link} date={news[5].date}></NewsCard>
              </div>
          </Carousel>
        </div>
      </Row>
    )
  }
}

export default NewsBar