import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from '@mui/icons-material/Search';


const GenericSearch = ({ fieldLabel }) => {
    return (
        <div style={{borderRadius: "25px", "marginLeft": "1vw"}}>

            <div className="searchfield-container">
                <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <div className='search-icon'>
                        <SearchIcon fontSize='medium'></SearchIcon>
                    </div>
                    <TextField
                        style={{"width": "20vw"}}
                        variant="standard"
                        label={fieldLabel}
                    />
                </div>
            </div>

            </div>
    )
}

export default GenericSearch;