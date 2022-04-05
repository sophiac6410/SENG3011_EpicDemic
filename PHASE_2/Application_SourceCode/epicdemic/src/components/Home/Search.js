import {InputGroup, FormControl, Row, Col } from "react-bootstrap";
import CountrySelect from "./CountrySearchBox";
import "react-multi-carousel/lib/styles.css";
import arrow from '../../static/arrow.svg'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate, } from 'react-router-dom';
import Link from '@material-ui/core/Link';

function Search() {

  let navigate = useNavigate(); 
  const routeChange = () =>{  
    navigate('/destination/PHILIPPINES');
  }

  const goDestination = () =>{  
    navigate('/finder');
  }

    return(
      <div className="border-radius-small bg-medium-teal" style={{padding: '50px'}}>
        <div className="search-row">
          <div className="search-col ps-4">
            <div className="search-bar-text">From:</div>
            <div className="border-radius-large searchfield-container">
              <CountrySelect isFrom={true}></CountrySelect>
            </div>
          </div>
          <div className="search-col">
            <div style={{ paddingTop: '25px' }}>
              <img src={arrow} alt="arrow" width="70px" height="30px"></img>
            </div>
          </div>
          <div className="search-col">
            <div className="search-bar-text">Destination:</div>
            <div className="border-radius-large searchfield-container">
              <CountrySelect isFrom={false}></CountrySelect>
            </div>
          </div>
          <div className="search-icon">
            <IconButton 
              aria-label="search"
              onClick={ routeChange }>
              <SearchIcon fontSize="large" />
            </IconButton>
          </div>


        </div>

        <div className="search-text" style={{textDecoration: 'underline'}}>
          <Link href="#" onClick={goDestination} color="inherit">
            I don't know where to go?
          </Link>
          {/* <a>I don't know where to go?</a> */}
        </div>
    </div>
    )
}

export default Search