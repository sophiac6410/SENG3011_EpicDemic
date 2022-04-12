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

function Search() {

  let navigate = useNavigate(); 
  const routeChange = () =>{  
    navigate('/destination/PHILIPPINES');
  }

  const goDestination = () =>{  
    navigate('/finder');
  }
    return(
      <div className="border-radius-small bg-off-white ps-5 pe-5 pt-4 pb-4 mt-5 mb-5">
        <div className="search-row">
          <div className="search-col ps-4">
            <Typography variant="bodyImportant" className="color-sky-blue ps-2">FROM</Typography>
            <div className="border-radius-large searchfield-container bg-sky-blue dark">
              <CountrySelect isFrom={true}></CountrySelect>
            </div>
          </div>
          <div className="search-col">
            <div style={{ paddingTop: '25px' }} className="color-medium-blue">
              <img src={arrow} alt="arrow" width="70px" height="30px"></img>
            </div>
          </div>
          <div className="search-col">
            <Typography variant="bodyImportant" className="color-sky-blue ps-2">TO</Typography>
            <div className="border-radius-large searchfield-container bg-sky-blue">
              <CountrySelect isFrom={false}></CountrySelect>
            </div>
          </div>
          <div className="search-icon">
            <IconButton 
              aria-label="search"
              onClick={ routeChange }>
              <SearchIcon sx={{ color: "#70C4E8"}} fontSize="large" />
            </IconButton>
          </div>
        </div>
    </div>
    )
}

export default Search