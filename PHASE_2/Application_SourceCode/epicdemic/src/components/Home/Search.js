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
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import React, { useState } from "react";
import { Divider } from "@mui/material";

function Search() {
  const [dest, setDest] = useState(null);

  let navigate = useNavigate(); 
  const routeChange = () =>{
    if (dest === null) return;
    
    console.log("route changing to " + dest.label + " " + dest.code);
    navigate(`/destination/${dest.code}`);
  }

  const goDestination = () =>{  
    navigate('/finder');
  }
    return(
      <div className="border-radius-large bg-white mt-3 mb-5" style={{opacity: 0.85, paddingTop: '1%', paddingBottom: '1.5%'}}>
        <div className="search-row">
          <div className="search-col ps-4" style={{ marginLeft: 25 }}>
            <Typography variant="bodyImportant" className="color-dark-teal ps-3 mb-2">FROM</Typography>
            <div className="border-radius-large searchfield-container ps-3 pe-5" >
              <FlightTakeoffIcon fontSize="large" ></FlightTakeoffIcon>
              <CountrySelect isFrom={true} handleInput={() => {}}></CountrySelect>
            </div>
          </div>
          {/* <div className="search-col ms-4 me-4">
            <div style={{ paddingTop: '25px', marginLeft: '25%' }}>
              <img src={arrow} alt="arrow" width="55%" height="55%"></img>
            </div>
          </div> */}
          <Divider orientation="vertical" flexItem style={{hieght: "90%"}}/>
          <div className="search-col me-4">
            <Typography variant="bodyImportant" className="color-dark-teal ps-5 mb-2">TO</Typography>
            <div className="border-radius-large searchfield-container ps-5 pe-5">
              <FlightLandIcon fontSize="large"></FlightLandIcon>
              <CountrySelect isFrom={false} handleInput={(e, v) => setDest(v)}></CountrySelect>
            </div>
          </div>
          <div className="bg-dark-teal border-radius-med text-center" style={{ padding: 0, marginRight: 20 }}>
            <IconButton 
              aria-label="search"
              onClick={ routeChange }>
              <SearchIcon sx={{ color: "white", padding: 0, fontSize: 30, mt: 2, mb:2, mr:2, ml: 2}}/>
            </IconButton>
          </div>
        </div>
    </div>
    )
}

export default Search