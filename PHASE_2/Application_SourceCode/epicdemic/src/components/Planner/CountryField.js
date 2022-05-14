import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

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
    "&.MuiAutocomplete-inputRoot": {
      paddingRight: "0px"
    },
    color: "black",
    backgroundColor: "white",
    paddingRight: "Opx",
  },
  endAdornment: {
    top: "calc(12% - 14px)"
  }
}));

export default function CountrySelect({isFrom = false, handleInput, value }) {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "row", padding: '2%' }}>
      <Autocomplete
        id="country-select-demo"
        classes={classes}
        sx={{ width: 200 }}
        popupIcon={""}
        value={value}
        options={ isFrom ? aus : Countries }
        autoHighlight
        // underlineShow={false}
        onChange={handleInput}
        getOptionLabel={(option) => option.name}
        // id="disable-clearable"
        // disableClearable
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 1, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            id="standard-basic" 
            defaultValue={isFrom && 'Australia'}
            placeholder={isFrom ? '' : 'Any Country'}
            variant="standard"
            size="large"
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
              // disableUnderline: true,
            }}
          />
        )}
      />
    </div>
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
export const Countries = [{
  "name": "Andorra",
  "code": "AD"
}, {
  "name": "Albania",
  "code": "AL"
}, {
  "name": "Austria",
  "code": "AT"
}, {
  "name": "Åland Islands",
  "code": "AX"
}, {
  "name": "Bosnia and Herzegovina",
  "code": "BA"
}, {
  "name": "Belgium",
  "code": "BE"
}, {
  "name": "Bulgaria",
  "code": "BG"
}, {
  "name": "Belarus",
  "code": "BY"
}, {
  "name": "Switzerland",
  "code": "CH"
}, {
  "name": "Cyprus",
  "code": "CY"
}, {
  "name": "Czech Republic",
  "code": "CZ"
}, {
  "name": "Germany",
  "code": "DE"
}, {
  "name": "Denmark",
  "code": "DK"
}, {
  "name": "Estonia",
  "code": "EE"
}, {
  "name": "Spain",
  "code": "ES"
}, {
  "name": "Finland",
  "code": "FI"
}, {
  "name": "Faroe Islands",
  "code": "FO"
}, {
  "name": "France",
  "code": "FR"
}, {
  "name": "United Kingdom",
  "code": "GB"
}, {
  "name": "Guernsey",
  "code": "GG"
}, {
  "name": "Greece",
  "code": "GR"
}, {
  "name": "Croatia",
  "code": "HR"
}, {
  "name": "Hungary",
  "code": "HU"
}, {
  "name": "Ireland",
  "code": "IE"
}, {
  "name": "Isle of Man",
  "code": "IM"
}, {
  "name": "Iceland",
  "code": "IC"
}, {
  "name": "Italy",
  "code": "IT"
}, {
  "name": "Jersey",
  "code": "JE"
}, {
  "name": "Liechtenstein",
  "code": "LI"
}, {
  "name": "Lithuania",
  "code": "LT"
}, {
  "name": "Luxembourg",
  "code": "LU"
}, {
  "name": "Latvia",
  "code": "LV"
}, {
  "name": "Monaco",
  "code": "MC"
}, {
  "name": "Moldova, Republic of",
  "code": "MD"
}, {
  "name": "Macedonia, The Former Yugoslav Republic of",
  "code": "MK"
}, {
  "name": "Malta",
  "code": "MT"
}, {
  "name": "Netherlands",
  "code": "NL"
}, {
  "name": "Norway",
  "code": "NO"
}, {
  "name": "Poland",
  "code": "PL"
}, {
  "name": "Portugal",
  "code": "PT"
}, {
  "name": "Romania",
  "code": "RO"
}, {
  "name": "Russian Federation",
  "code": "RU"
}, {
  "name": "Sweden",
  "code": "SE"
}, {
  "name": "Slovenia",
  "code": "SI"
}, {
  "name": "Svalbard and Jan Mayen",
  "code": "SJ"
}, {
  "name": "Slovakia",
  "code": "SK"
}, {
  "name": "San Marino",
  "code": "SM"
}, {
  "name": "Ukraine",
  "code": "UA"
}, {
  "name": "Holy See (Vatican City State)",
  "code": "VA"
}]