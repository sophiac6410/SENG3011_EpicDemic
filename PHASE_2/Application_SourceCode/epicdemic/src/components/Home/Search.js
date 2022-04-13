import CountrySelect from "./CountrySearchBox";
import "react-multi-carousel/lib/styles.css";
import arrow from '../../static/arrow.svg'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useNavigate, } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import "./../../styles/App.css"
import Typography from '@mui/material/Typography'
import { Row } from "react-bootstrap";
import React, { useState } from "react";

function Search() {
  const [dest, setDest] = useState(null);

  let navigate = useNavigate(); 
  const routeChange = () =>{
    if (dest === null) return;
    
    console.log("route changing to " + dest.label + " " + dest.code);
    navigate(`/destination/${dest.label}`, {
      state: {
        country: dest.label,
        code: dest.code
      }
    });
  }

  const goDestination = () =>{  
    navigate('/finder');
  }
    return(
      <div className="border-radius-small bg-off-white ps-5 pe-5 pt-4 pb-5 mt-5 mb-5" style={{width: "80%"}}>
        <div className="search-row">
          <div className="search-col ps-4">
            <Typography variant="bodyImportant" className="color-sky-blue ps-2 mb-2">FROM</Typography>
            <div className="border-radius-large searchfield-container bg-sky-blue ps-5 pe-5">
              <CountrySelect isFrom={true}></CountrySelect>
            </div>
          </div>
          <div className="search-col ms-4 me-4">
            <div style={{ paddingTop: '25px' }} className="color-medium-blue">
              <img src={arrow} alt="arrow" width="90px" height="50px"></img>
            </div>
          </div>
          <div className="search-col">
            <Typography variant="bodyImportant" className="color-sky-blue ps-2 mb-2">TO</Typography>
            <div className="border-radius-large searchfield-container ps-5 pe-5 bg-sky-blue">
              <CountrySelect isFrom={false}></CountrySelect>
            </div>
          </div>
          <div className="search-icon ms-5">
            <IconButton 
              aria-label="search"
              onClick={ routeChange }>
              <SearchIcon sx={{ color: "#70C4E8", fontSize: "60px"}}/>
            </IconButton>
          </div>
        </div>
    </div>
    )
}

export default Search