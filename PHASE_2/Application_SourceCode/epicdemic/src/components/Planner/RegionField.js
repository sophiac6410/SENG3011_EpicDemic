import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    "&.MuiInput-underline:before": {
      borderBottom: "1px solid rgb(118, 118, 118)"
    },
    "&.MuiInput-underline:hover:before": {
      borderBottom: "2px solid black"
    },
    "&.MuiInput-underline:after": {
      borderBottom: "2px solid #0F83A0"
    },
    color: "black",
    backgroundColor: "white",
  },
}));

const GenericSearch = ({ options, value, placeholder, handleInput, width }) => {
    const classes = useStyles();
    return (
        <div className="searchfield-container bg-white border-radius-large">
            <div style={{ display: "flex", alignItems: "center", flexDirection: "row"}} className="pe-1">
                <div className="me-2">
                </div>
                <Autocomplete
                    sx={{ width: {width} }}
                    classes={classes}
                    popupIcon={""}
                    value={value}
                    options={options ? options : regionOptions}
                    // id="disable-clearable"
                    // disableClearable
                    autoHighlight
                    onChange={handleInput}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.name} 
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            variant="standard"
                            {...params}
                            placeholder={placeholder}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password'
                            }}
                        />
                        )}
                        />
            </div>
        </div>

    )
}

const regionOptions = [
    {
      "objectId": "X2rEcTJnsE",
      "code": "AF",
      "name": "Africa",
      "createdAt": "2019-12-09T20:53:12.050Z",
      "updatedAt": "2019-12-12T16:08:04.299Z",
      "countries": {
        "__type": "Relation",
        "className": "Country"
      }
    },
    {
      "objectId": "vZNZcahFvu",
      "code": "NA",
      "name": "North America",
      "createdAt": "2019-12-09T20:53:12.050Z",
      "updatedAt": "2019-12-12T16:08:06.294Z",
      "countries": {
        "__type": "Relation",
        "className": "Country"
      }
    },
    {
      "objectId": "E6LHZzkHr6",
      "code": "OC",
      "name": "Oceania",
      "createdAt": "2019-12-09T20:53:12.050Z",
      "updatedAt": "2019-12-12T16:08:07.698Z",
      "countries": {
        "__type": "Relation",
        "className": "Country"
      }
    },
    {
      "objectId": "xwS5b1G6tn",
      "code": "AN",
      "name": "Antarctica",
      "createdAt": "2019-12-09T20:53:12.050Z",
      "updatedAt": "2019-12-12T16:08:03.515Z",
      "countries": {
        "__type": "Relation",
        "className": "Country"
      }
    },
    {
      "objectId": "28HX8qDZHw",
      "code": "EU",
      "name": "Europe",
      "createdAt": "2019-12-09T20:53:12.050Z",
      "updatedAt": "2019-12-12T16:08:05.613Z",
      "countries": {
        "__type": "Relation",
        "className": "Country"
      }
    },
    {
      "objectId": "mSxk54vkg6",
      "code": "AS",
      "name": "Asia",
      "createdAt": "2019-12-09T20:53:12.050Z",
      "updatedAt": "2019-12-12T16:08:04.951Z",
      "countries": {
        "__type": "Relation",
        "className": "Country"
      }
    },
    {
      "objectId": "ISPUD93Or8",
      "code": "SA",
      "name": "South America",
      "createdAt": "2019-12-09T20:53:12.050Z",
      "updatedAt": "2019-12-12T16:08:06.884Z",
      "countries": {
        "__type": "Relation",
        "className": "Country"
      }
    }
  ]

export default GenericSearch;
