import {InputGroup, FormControl, Row, Col } from "react-bootstrap";
import CountrySelect from "./CountrySearchBox";
import "react-multi-carousel/lib/styles.css";
import arrow from '../../static/arrow.svg'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate, } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

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
            <span className="body-caption" style={{color: 'white', margin: '0px 30px'}}>From</span>
            <div className="border-radius-large searchfield-container">
              <CountrySelect isFrom={true}></CountrySelect>
            </div>
          </div>
          <div className="search-col">
            <div style={{ paddingTop: '25px' }}>
              <IconButton>
                <SwapHorizIcon fontSize="large" sx={{ color: 'white' }}></SwapHorizIcon>
              </IconButton>
            </div>
          </div>
          <div className="search-col">
            <div className="body-caption" style={{color: 'white', margin: '0px 30px'}}>Destination</div>
            <div className="border-radius-large searchfield-container">
              <CountrySelect isFrom={false}></CountrySelect>
            </div>
          </div>
          <div className="search-icon">
            <IconButton 
              aria-label="search"
              onClick={ routeChange }>
              <SearchIcon fontSize="large" sx={{color: 'white'}}/>
            </IconButton>
          </div>
        </div>

        <div className="search-text" style={{textDecoration: 'underline'}}>
          <Link href="#" onClick={goDestination} color='inherit'>
            I don't know where to go?
          </Link>
        </div>
    </div>
    )
}

export default Search