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
    'date': "18 Apr 2022",
    'link': 'https://www.traveldailynews.com/post/the-americas-and-asia-pacific-regions-show-increased-hotel-pipeline-activity'
  },
  {
    'title': "Fraport traffic figures – March 2022: Upward trend in passenger traffic continues",
    'date': "18 Apr 2022",
    'link': 'https://www.traveldailynews.com/post/fraport-traffic-figures-march-2022-upward-trend-in-passenger-traffic-continues'
  },
  {
    'title': "Gulf Air to restore over 90% of India schedule this summer",
    'date': "18 Apr 2022",
    'link': 'https://www.traveldailynews.com/post/gulf-air-to-restore-over-90-of-india-schedule-this-summer'
  },
  {
    'title': "Australia to scrap Covid test entry requirement for overseas travellers",
    'date': "18 Apr 2022",
    'link': 'https://www.news.com.au/travel/travel-updates/australia-to-scrap-covid-test-entry-requirement-for-overseas-travellers/news-story/0cf503d2c7d49e2e5213c931a1f5b89c'
  },
  {
    'title': "Luggage left behind in chaotic airport crush over Easter weekend",
    'date': "18 Apr 2022",
    'link': 'https://www.news.com.au/travel/travel-updates/half-a-km-long-chaos-at-airports-continues-over-easter/news-story/78624b98e5e19ba2550c001537143c21'
  },
  {
    'title': "Australia scraps COVID-19 testing for international arrivals",
    'date': "18 Apr 2022",
    'link': 'https://www.9news.com.au/national/covid-19-australia-stops-all-coronavirus-testing-for-international-arrivals/a01f0f72-27ab-40d3-a56e-9251b13cbabf'
  }
]

class NewsBar extends React.Component {
  render() {
    return(
      <Row className="mt-5 pt-5 mb-5">
        <div className="title-h3 mt-5">Latest News</div>
        <div className="news-carousel">
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