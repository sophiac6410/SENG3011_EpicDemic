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
    color: "black",
    backgroundColor: "white",
  },
}));

export default function CountrySelect({region, handleInput, value }) {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "row", padding: '2%' }}>
      <Autocomplete
        id="country-select-demo"
        classes={classes}
        sx={{ width: 240 }}
        popupIcon={""}
        value={value ? allCountries.find(e => e.name === value.name) : null}
        options={ region ? allCountries.filter(item => item.continent.code === region.code ) : allCountries }
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
            placeholder='Any Country'
            variant="standard"
            size="large"
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
              disableUnderline: true,
            }}
          />
        )}
      />
    </div>
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
export const euCountries = [{
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
  "name": "Vatican",
  "code": "VA"
}]

export const allCountries = [
{
"objectId": "MEzedNnNVw",
"code": "AF",
"name": "Afghanistan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:05:12.106Z",
"updatedAt": "2020-04-13T18:17:02.862Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "8rTBsf4ObQ",
"code": "AL",
"name": "Albania",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:05:41.230Z",
"updatedAt": "2020-04-13T18:16:50.179Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "8XKDe93BnC",
"code": "DZ",
"name": "Algeria",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:27:07.301Z",
"updatedAt": "2020-04-13T18:18:07.109Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "s6ejWUPV5j",
"code": "AS",
"name": "American Samoa",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:07:10.026Z",
"updatedAt": "2020-04-13T17:40:46.208Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "sv7fjDVISU",
"code": "AD",
"name": "Andorra",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:04:54.350Z",
"updatedAt": "2020-04-13T18:18:18.830Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "khAszEtDXl",
"code": "AO",
"name": "Angola",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:06:12.646Z",
"updatedAt": "2020-04-13T18:18:30.353Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "8iGu4upB6j",
"code": "AI",
"name": "Anguilla",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:05:33.770Z",
"updatedAt": "2020-04-13T18:18:48.679Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "Fs3xs9NlJa",
"code": "AQ",
"name": "Antarctica",
"continent": {
"objectId": "xwS5b1G6tn",
"code": "AN",
"name": "Antarctica",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:03.515Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:06:19.618Z",
"updatedAt": "2020-04-13T18:19:28.061Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "I8RkNYNHa4",
"code": "AG",
"name": "Antigua and Barbuda",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:05:26.074Z",
"updatedAt": "2020-04-13T18:18:51.519Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "emj7gm2L4O",
"code": "AR",
"name": "Argentina",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:06:29.227Z",
"updatedAt": "2020-04-13T18:19:08.662Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "hVs5HyPvID",
"code": "AM",
"name": "Armenia",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:05:58.302Z",
"updatedAt": "2020-04-13T18:16:21.418Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "qCMlm28jY0",
"code": "AW",
"name": "Aruba",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:11:06.602Z",
"updatedAt": "2020-04-13T18:18:53.614Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "8lauBzPLI5",
"code": "AU",
"name": "Australia",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:08:46.550Z",
"updatedAt": "2020-04-13T18:17:35.397Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "sbCG0KlS9w",
"code": "AT",
"name": "Austria",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:07:17.554Z",
"updatedAt": "2020-04-13T18:18:13.541Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "mDMzJJXtB2",
"code": "AZ",
"name": "Azerbaijan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:11:24.026Z",
"updatedAt": "2020-04-13T18:16:40.965Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "5xyA61UG1h",
"code": "BS",
"name": "Bahamas",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:18:50.104Z",
"updatedAt": "2020-04-13T18:18:47.281Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "gXKD3sCcJI",
"code": "BH",
"name": "Bahrain",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:13:49.022Z",
"updatedAt": "2020-04-13T18:16:30.086Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "AWnxgoUzw0",
"code": "BD",
"name": "Bangladesh",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:12:11.166Z",
"updatedAt": "2020-04-13T18:17:04.446Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "27DB6uofpp",
"code": "BB",
"name": "Barbados",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:12:02.920Z",
"updatedAt": "2020-04-13T18:18:33.149Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "5oTW0cNpxA",
"code": "BY",
"name": "Belarus",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:19:35.126Z",
"updatedAt": "2020-04-13T18:16:44.774Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "TySeDEiFtc",
"code": "BE",
"name": "Belgium",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:12:27.969Z",
"updatedAt": "2020-04-13T18:18:14.284Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "v9SGqANrU2",
"code": "BZ",
"name": "Belize",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:20:00.398Z",
"updatedAt": "2020-04-13T18:18:59.892Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "zVrvUTYEeC",
"code": "BJ",
"name": "Benin",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:14:06.575Z",
"updatedAt": "2020-04-13T18:17:56.261Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "nj3z9SHzzq",
"code": "BM",
"name": "Bermuda",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:14:23.815Z",
"updatedAt": "2020-04-13T18:18:47.986Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "ZvhrzA2APU",
"code": "BT",
"name": "Bhutan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:18:59.690Z",
"updatedAt": "2020-04-13T18:17:07.597Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "PdgGA5Y5Tt",
"code": "BO",
"name": "Bolivia",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:14:43.110Z",
"updatedAt": "2020-04-13T18:19:10.703Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "lP9UmD2WgK",
"code": "BQ",
"name": "Bonaire",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:14:55.831Z",
"updatedAt": "2020-04-13T18:19:30.197Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "OWstcXnnAs",
"code": "BA",
"name": "Bosnia and Herzegovina",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:11:42.389Z",
"updatedAt": "2020-04-13T18:18:29.313Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "9l8d95idZG",
"code": "BW",
"name": "Botswana",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:19:19.936Z",
"updatedAt": "2020-04-13T18:16:56.838Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "3K9cHA3Xp8",
"code": "BV",
"name": "Bouvet Island",
"continent": {
"objectId": "xwS5b1G6tn",
"code": "AN",
"name": "Antarctica",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:03.515Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:19:12.547Z",
"updatedAt": "2020-04-13T18:18:32.464Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "qq2ryXaIYG",
"code": "BR",
"name": "Brazil",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:15:03.703Z",
"updatedAt": "2020-04-13T18:18:40.930Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "WUeznxS4oA",
"code": "IO",
"name": "British Indian Ocean Territory",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T05:03:30.116Z",
"updatedAt": "2020-04-13T18:17:09.977Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "mNiifJ3CK4",
"code": "VG",
"name": "British Virgin Islands",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T01:39:58.035Z",
"updatedAt": "2020-04-13T18:18:54.307Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "W1DBYJ0DT4",
"code": "BN",
"name": "Brunei",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:14:32.095Z",
"updatedAt": "2020-04-13T18:17:25.461Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "LHOE9MSsmI",
"code": "BG",
"name": "Bulgaria",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:13:24.159Z",
"updatedAt": "2020-04-13T18:16:49.432Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "buIC80yx3R",
"code": "BF",
"name": "Burkina Faso",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:13:14.334Z",
"updatedAt": "2020-04-13T18:17:53.159Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "qEgnSc4sip",
"code": "BI",
"name": "Burundi",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:13:58.266Z",
"updatedAt": "2020-04-13T18:16:38.737Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "EpBnGVkBLF",
"code": "KH",
"name": "Cambodia",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T09:59:03.551Z",
"updatedAt": "2020-04-13T18:17:26.874Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "pUFZ2RIIvG",
"code": "CM",
"name": "Cameroon",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:27:09.818Z",
"updatedAt": "2020-04-13T18:17:46.490Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "mTtBWeeHCo",
"code": "CA",
"name": "Canada",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:20:10.062Z",
"updatedAt": "2020-04-13T18:19:24.219Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "LrFc6CEfje",
"code": "CV",
"name": "Cape Verde",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:40:38.218Z",
"updatedAt": "2020-04-13T18:18:33.863Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "4lgb4MnCu4",
"code": "KY",
"name": "Cayman Islands",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:03:23.665Z",
"updatedAt": "2020-04-13T18:18:59.150Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "CAFBhOmYoF",
"code": "CF",
"name": "Central African Republic",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:22:24.154Z",
"updatedAt": "2020-04-13T18:16:25.165Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "8lQ5LYAawJ",
"code": "TD",
"name": "Chad",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:05:05.862Z",
"updatedAt": "2020-04-13T18:18:01.209Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "dnDRHIFqGe",
"code": "CL",
"name": "Chile",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:26:50.747Z",
"updatedAt": "2020-04-13T18:19:09.933Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "jPsWdF78Gn",
"code": "CN",
"name": "China",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:27:25.283Z",
"updatedAt": "2020-04-13T18:17:24.023Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "8tlFatlW3B",
"code": "CX",
"name": "Christmas Island",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:40:59.882Z",
"updatedAt": "2020-04-13T18:17:36.100Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "Ovzp6Ca4tr",
"code": "CC",
"name": "Cocos [Keeling] Islands",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:21:56.158Z",
"updatedAt": "2020-04-13T18:17:16.154Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "R3I0XpBMHj",
"code": "CO",
"name": "Colombia",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:36:51.935Z",
"updatedAt": "2020-04-13T18:19:06.158Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "SJvwuMEme7",
"code": "KM",
"name": "Comoros",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:00:11.660Z",
"updatedAt": "2020-04-13T18:16:54.743Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "2Icy8PIAyj",
"code": "CK",
"name": "Cook Islands",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:26:42.258Z",
"updatedAt": "2020-04-13T18:17:31.372Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "CcOW7twmeX",
"code": "CR",
"name": "Costa Rica",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:39:58.102Z",
"updatedAt": "2020-04-13T18:19:03.675Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "uj5JYO5BE3",
"code": "HR",
"name": "Croatia",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:54:49.610Z",
"updatedAt": "2020-04-13T18:18:28.566Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "YNRVNxzcFx",
"code": "CU",
"name": "Cuba",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:40:14.874Z",
"updatedAt": "2020-04-13T18:18:45.673Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "6RJs1GA7WP",
"code": "CW",
"name": "Curacao",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:40:50.905Z",
"updatedAt": "2020-04-13T18:19:29.485Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "1KRscl4VTZ",
"code": "CY",
"name": "Cyprus",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:41:11.611Z",
"updatedAt": "2020-04-13T18:16:19.209Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "FIdcKBVyI3",
"code": "CZ",
"name": "Czech Republic",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:41:26.966Z",
"updatedAt": "2020-04-13T18:18:23.098Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "7UlxnC5LyT",
"code": "CD",
"name": "Democratic Republic of the Congo",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:22:11.038Z",
"updatedAt": "2020-04-13T18:16:22.911Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "3SYcv5XaFE",
"code": "DK",
"name": "Denmark",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:24:54.618Z",
"updatedAt": "2020-04-13T18:18:08.641Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "DKDsqKRrNW",
"code": "DJ",
"name": "Djibouti",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:24:45.915Z",
"updatedAt": "2020-04-13T18:16:23.738Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "K9EoQTanO6",
"code": "DM",
"name": "Dominica",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:26:19.590Z",
"updatedAt": "2020-04-13T18:18:50.786Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "BkDVxFnLbN",
"code": "DO",
"name": "Dominican Republic",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:26:28.078Z",
"updatedAt": "2020-04-13T18:18:44.733Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "uy6B519CzE",
"code": "TL",
"name": "East Timor",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:37:12.566Z",
"updatedAt": "2020-04-13T18:17:32.052Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "w42L24Frj9",
"code": "EC",
"name": "Ecuador",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:28:15.226Z",
"updatedAt": "2020-04-13T18:19:05.368Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "hFkwjKITta",
"code": "EG",
"name": "Egypt",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:29:19.470Z",
"updatedAt": "2020-04-13T18:16:36.336Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "neXLLQcOcE",
"code": "SV",
"name": "El Salvador",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:58:09.831Z",
"updatedAt": "2020-04-13T18:19:00.600Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "hzdCZRHhIY",
"code": "GQ",
"name": "Equatorial Guinea",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:27:13.794Z",
"updatedAt": "2020-04-13T18:17:51.702Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "rVI3whtxQX",
"code": "ER",
"name": "Eritrea",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:29:57.030Z",
"updatedAt": "2020-04-13T18:16:35.575Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "kGAoZ5pH7T",
"code": "EE",
"name": "Estonia",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:28:37.002Z",
"updatedAt": "2020-04-13T18:16:39.531Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "RG4CMN42m1",
"code": "ET",
"name": "Ethiopia",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T23:37:54.810Z",
"updatedAt": "2020-04-13T18:16:34.783Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "xoqwbHS99Z",
"code": "FK",
"name": "Falkland Islands",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T23:41:49.057Z",
"updatedAt": "2020-04-13T18:18:42.187Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "D1Tu0ghkZ3",
"code": "FO",
"name": "Faroe Islands",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T23:42:09.428Z",
"updatedAt": "2020-04-13T18:18:07.803Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "0iYnsd3adu",
"code": "FJ",
"name": "Fiji",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T23:41:41.232Z",
"updatedAt": "2020-04-13T18:17:45.075Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "nfHDWPtgDF",
"code": "FI",
"name": "Finland",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T23:38:19.514Z",
"updatedAt": "2020-04-13T18:16:45.821Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "vBQFvgbzPX",
"code": "FR",
"name": "France",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T23:42:17.814Z",
"updatedAt": "2020-04-13T18:18:18.133Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "0FjIYpVd8h",
"code": "GF",
"name": "French Guiana",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:25:34.486Z",
"updatedAt": "2020-04-13T18:18:35.402Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "Ms1BrT4Gl8",
"code": "PF",
"name": "French Polynesia",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T15:08:41.209Z",
"updatedAt": "2020-04-13T18:19:13.307Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "9yGMMYfLDC",
"code": "TF",
"name": "French Southern Territories",
"continent": {
"objectId": "xwS5b1G6tn",
"code": "AN",
"name": "Antarctica",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:03.515Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:05:28.816Z",
"updatedAt": "2020-04-13T18:17:14.736Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "2aC5hV2kfd",
"code": "GA",
"name": "Gabon",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T01:22:22.862Z",
"updatedAt": "2020-04-13T18:17:56.964Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "DGGLf2Q1tS",
"code": "GM",
"name": "Gambia",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:26:29.222Z",
"updatedAt": "2020-04-13T18:17:59.790Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "J7QoCukbse",
"code": "GE",
"name": "Georgia",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:25:03.242Z",
"updatedAt": "2020-04-13T18:16:43.236Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "cXVjaWqsnY",
"code": "DE",
"name": "Germany",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:45:53.198Z",
"updatedAt": "2020-04-13T18:18:15.035Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "vCIN9WyEHn",
"code": "GH",
"name": "Ghana",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:25:53.234Z",
"updatedAt": "2020-04-13T18:17:50.977Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "usW9VKCd8N",
"code": "GI",
"name": "Gibraltar",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:26:12.517Z",
"updatedAt": "2020-04-13T18:17:59.115Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "zuCmaUX1g9",
"code": "GR",
"name": "Greece",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:27:24.090Z",
"updatedAt": "2020-04-13T18:16:38.017Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "S3kieBKF1Q",
"code": "GL",
"name": "Greenland",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:26:20.066Z",
"updatedAt": "2020-04-13T18:18:38.191Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "8DHNNAHDXI",
"code": "GD",
"name": "Grenada",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:24:55.146Z",
"updatedAt": "2020-04-13T18:18:58.431Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "j5lw2HxbXZ",
"code": "GP",
"name": "Guadeloupe",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:27:02.366Z",
"updatedAt": "2020-04-13T18:18:57.753Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "E1fDBUFjuu",
"code": "GU",
"name": "Guam",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:48:04.490Z",
"updatedAt": "2020-04-13T18:19:19.888Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "Rkb0Ji6GtG",
"code": "GT",
"name": "Guatemala",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:45:25.674Z",
"updatedAt": "2020-04-13T18:19:01.291Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "k96wKD7ZpG",
"code": "GG",
"name": "Guernsey",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:25:44.932Z",
"updatedAt": "2020-04-13T18:18:21.608Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "l2E7bFn2O6",
"code": "GN",
"name": "Guinea",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:26:49.782Z",
"updatedAt": "2020-04-13T18:18:00.519Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "HhLTUnF1fz",
"code": "GW",
"name": "Guinea-Bissau",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:48:14.109Z",
"updatedAt": "2020-04-13T18:17:54.560Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "uyLj6RP9AZ",
"code": "GY",
"name": "Guyana",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:48:22.639Z",
"updatedAt": "2020-04-13T18:18:34.716Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "QLFfURjWpu",
"code": "HT",
"name": "Haiti",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T03:04:31.338Z",
"updatedAt": "2020-04-13T18:19:07.758Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "obivyMu1QI",
"code": "HM",
"name": "Heard Island and McDonald Islands",
"continent": {
"objectId": "xwS5b1G6tn",
"code": "AN",
"name": "Antarctica",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:03.515Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:48:42.334Z",
"updatedAt": "2020-04-13T18:17:15.431Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "pM1H87l6Bm",
"code": "HN",
"name": "Honduras",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:48:47.746Z",
"updatedAt": "2020-04-13T18:19:02.066Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "KtRJin3dy9",
"code": "HK",
"name": "Hong Kong",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:48:33.066Z",
"updatedAt": "2020-04-13T18:17:24.729Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "f5WB3Ij653",
"code": "HU",
"name": "Hungary",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T03:05:00.842Z",
"updatedAt": "2020-04-13T18:16:48.761Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "5VTtzmVSWN",
"code": "IS",
"name": "Iceland",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T05:11:02.318Z",
"updatedAt": "2020-04-13T18:18:09.511Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "DlHQBjd2Ke",
"code": "IN",
"name": "India",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T03:49:44.431Z",
"updatedAt": "2020-04-13T18:17:08.498Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "pOykqMaxZB",
"code": "ID",
"name": "Indonesia",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T03:16:27.362Z",
"updatedAt": "2020-04-13T18:17:19.667Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "wv4OCjRaNi",
"code": "IR",
"name": "Iran",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T05:04:27.310Z",
"updatedAt": "2020-04-13T18:16:18.503Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "nvhpnKO5rE",
"code": "IQ",
"name": "Iraq",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T05:03:36.781Z",
"updatedAt": "2020-04-13T18:16:16.883Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "FSUOeNw5vK",
"code": "IE",
"name": "Ireland",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T03:44:34.862Z",
"updatedAt": "2020-04-13T18:18:16.614Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "AheHxSBPbE",
"code": "IM",
"name": "Isle of Man",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T03:49:32.546Z",
"updatedAt": "2020-04-13T18:18:20.932Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "4lBFb6Wpq5",
"code": "IL",
"name": "Israel",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T03:48:36.810Z",
"updatedAt": "2020-04-13T18:16:31.555Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "hOu7Is3jvO",
"code": "IT",
"name": "Italy",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T05:11:14.623Z",
"updatedAt": "2020-04-13T18:18:26.358Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "egoIFgkxC3",
"code": "CI",
"name": "Ivory Coast",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:26:29.475Z",
"updatedAt": "2020-04-13T18:17:50.259Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "iRCCJGZ3RJ",
"code": "JM",
"name": "Jamaica",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T09:31:39.550Z",
"updatedAt": "2020-04-13T18:18:43.998Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "UN9yBtQstI",
"code": "JP",
"name": "Japan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T09:33:03.466Z",
"updatedAt": "2020-04-13T18:17:28.831Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "cbmMpY1LjE",
"code": "JE",
"name": "Jersey",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T09:31:31.519Z",
"updatedAt": "2020-04-13T18:18:20.234Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "AVGAFwTSFb",
"code": "JO",
"name": "Jordan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T09:32:10.932Z",
"updatedAt": "2020-04-13T18:16:26.558Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "nRlkwMtWiB",
"code": "KZ",
"name": "Kazakhstan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:03:33.126Z",
"updatedAt": "2020-04-13T18:17:13.250Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "hWGVevpYaK",
"code": "KE",
"name": "Kenya",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T09:57:45.474Z",
"updatedAt": "2020-04-13T18:16:22.158Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "qCcuxOqgkB",
"code": "KI",
"name": "Kiribati",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:00:00.150Z",
"updatedAt": "2020-04-13T18:19:14.807Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "IAwJVS7NjJ",
"code": "XK",
"name": "Kosovo",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T02:09:56.346Z",
"updatedAt": "2020-04-13T18:16:52.616Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "qlkgJorlNV",
"code": "KW",
"name": "Kuwait",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:03:11.882Z",
"updatedAt": "2020-04-13T18:16:27.922Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "KoZCNHDS5X",
"code": "KG",
"name": "Kyrgyzstan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T09:58:32.674Z",
"updatedAt": "2020-04-13T18:17:13.983Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "eaNpdUY6IC",
"code": "LA",
"name": "Laos",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:07:35.338Z",
"updatedAt": "2020-04-13T18:17:20.430Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "SRLc1TCwHn",
"code": "LV",
"name": "Latvia",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:11:20.838Z",
"updatedAt": "2020-04-13T18:16:40.245Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "P2wZxWNxtr",
"code": "LB",
"name": "Lebanon",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:07:54.182Z",
"updatedAt": "2020-04-13T18:16:27.234Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "fl5yo1HfMR",
"code": "LS",
"name": "Lesotho",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:09:06.827Z",
"updatedAt": "2020-04-13T18:16:56.141Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "ZoFyPeNM5E",
"code": "LR",
"name": "Liberia",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:08:55.866Z",
"updatedAt": "2020-04-13T18:17:49.555Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "FgwdDPUXmJ",
"code": "LY",
"name": "Libya",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:12:15.146Z",
"updatedAt": "2020-04-13T18:17:45.759Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "f83FzMh6Ty",
"code": "LI",
"name": "Liechtenstein",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:08:17.098Z",
"updatedAt": "2020-04-13T18:18:19.517Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "9kbcTFZyKo",
"code": "LT",
"name": "Lithuania",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:09:16.058Z",
"updatedAt": "2020-04-13T18:16:41.662Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "5LNFOuO2Wh",
"code": "LU",
"name": "Luxembourg",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:10:11.887Z",
"updatedAt": "2020-04-13T18:18:15.795Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "larowCNukg",
"code": "MO",
"name": "Macao",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:24:20.255Z",
"updatedAt": "2020-04-13T18:17:26.162Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "09fXl7u3FD",
"code": "MG",
"name": "Madagascar",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:16:10.062Z",
"updatedAt": "2020-04-13T18:17:02.071Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "clpCIxZu1P",
"code": "MW",
"name": "Malawi",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:26:20.998Z",
"updatedAt": "2020-04-13T18:16:55.434Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "SHOmq2VQlZ",
"code": "MY",
"name": "Malaysia",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T12:45:47.995Z",
"updatedAt": "2020-04-13T18:17:22.991Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "ovfuQeRszZ",
"code": "MV",
"name": "Maldives",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:26:08.049Z",
"updatedAt": "2020-04-13T18:17:09.278Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "jreQzrjZx6",
"code": "ML",
"name": "Mali",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:18:51.158Z",
"updatedAt": "2020-04-13T18:18:02.734Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "HEXUplP1Se",
"code": "MT",
"name": "Malta",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:25:07.171Z",
"updatedAt": "2020-04-13T18:18:06.417Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "ZTZhlMFIyJ",
"code": "MH",
"name": "Marshall Islands",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:17:00.179Z",
"updatedAt": "2020-04-13T18:17:36.911Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "zA1OoRvjvL",
"code": "MQ",
"name": "Martinique",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:24:37.058Z",
"updatedAt": "2020-04-13T18:18:46.366Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "1hYnFHML5d",
"code": "MR",
"name": "Mauritania",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:24:47.112Z",
"updatedAt": "2020-04-13T18:17:55.573Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "cxnFBlqeWx",
"code": "MU",
"name": "Mauritius",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:25:31.882Z",
"updatedAt": "2020-04-13T18:16:57.524Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "987PhBD5EQ",
"code": "YT",
"name": "Mayotte",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T02:17:52.394Z",
"updatedAt": "2020-04-13T18:17:00.394Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "jbrIeE76hr",
"code": "MX",
"name": "Mexico",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:26:35.600Z",
"updatedAt": "2020-04-13T18:19:12.373Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "Y3YvNEgaqp",
"code": "FM",
"name": "Micronesia",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T23:41:56.647Z",
"updatedAt": "2020-04-13T18:17:37.670Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "bmYANF81hv",
"code": "MD",
"name": "Moldova",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:15:11.818Z",
"updatedAt": "2020-04-13T18:16:43.984Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "nE8gX0MFSZ",
"code": "MC",
"name": "Monaco",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:15:02.968Z",
"updatedAt": "2020-04-13T18:18:17.319Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "76H3yHIo7U",
"code": "MN",
"name": "Mongolia",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:19:39.718Z",
"updatedAt": "2020-04-13T18:17:34.295Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "wY0pApCtUt",
"code": "ME",
"name": "Montenegro",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:15:42.122Z",
"updatedAt": "2020-04-13T18:18:27.787Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "zowYF6xHFj",
"code": "MS",
"name": "Montserrat",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:24:57.862Z",
"updatedAt": "2020-04-13T18:18:55.661Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "Smz1hTRSIU",
"code": "MA",
"name": "Morocco",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:12:34.270Z",
"updatedAt": "2020-04-13T18:18:05.729Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "9CVfAKT2WO",
"code": "MZ",
"name": "Mozambique",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T12:47:31.694Z",
"updatedAt": "2020-04-13T18:17:01.233Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "cz9fi68eVU",
"code": "MM",
"name": "Myanmar [Burma]",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:19:13.726Z",
"updatedAt": "2020-04-13T18:17:11.655Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "cJ8QXx4aDG",
"code": "NA",
"name": "Namibia",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T12:47:47.167Z",
"updatedAt": "2020-04-13T18:18:31.056Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "dhD7xYDFi6",
"code": "NR",
"name": "Nauru",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T14:14:29.183Z",
"updatedAt": "2020-04-13T18:17:41.249Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "uq5oiRuEKm",
"code": "NP",
"name": "Nepal",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T14:13:59.322Z",
"updatedAt": "2020-04-13T18:17:10.714Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "9FyUSGZNnf",
"code": "NL",
"name": "Netherlands",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T13:14:50.787Z",
"updatedAt": "2020-04-13T18:18:12.846Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "7Ewydti2W5",
"code": "NC",
"name": "New Caledonia",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T12:48:06.358Z",
"updatedAt": "2020-04-13T18:17:42.782Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "2vGNu7Yn7D",
"code": "NZ",
"name": "New Zealand",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T14:14:47.540Z",
"updatedAt": "2020-04-13T18:17:44.308Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "sCGe1vsv7x",
"code": "NI",
"name": "Nicaragua",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T13:13:44.298Z",
"updatedAt": "2020-04-13T18:19:02.797Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "lpk34LaX1T",
"code": "NE",
"name": "Niger",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T12:48:20.971Z",
"updatedAt": "2020-04-13T18:18:02.019Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "oqts6mjw76",
"code": "NG",
"name": "Nigeria",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T12:48:48.070Z",
"updatedAt": "2020-04-13T18:17:52.462Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "QJRUbL4g9z",
"code": "NU",
"name": "Niue",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T14:14:38.329Z",
"updatedAt": "2020-04-13T18:19:18.430Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "NHfUsjuEP3",
"code": "NF",
"name": "Norfolk Island",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T12:48:40.646Z",
"updatedAt": "2020-04-13T18:17:43.493Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "cbUYyXWdUS",
"code": "KP",
"name": "North Korea",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:00:52.788Z",
"updatedAt": "2020-04-13T18:17:29.604Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "dAH4X1RHQb",
"code": "MK",
"name": "North Macedonia",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:17:11.434Z",
"updatedAt": "2020-04-13T18:16:48.056Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "cljDTSxy5A",
"code": "MP",
"name": "Northern Mariana Islands",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:24:29.437Z",
"updatedAt": "2020-04-13T18:19:19.153Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "T6MXJLAUjG",
"code": "NO",
"name": "Norway",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T13:56:16.055Z",
"updatedAt": "2020-04-13T18:18:24.177Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "ta4EmTNWmu",
"code": "OM",
"name": "Oman",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T14:16:03.151Z",
"updatedAt": "2020-04-13T18:16:28.668Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "YE4pRFqDqA",
"code": "PK",
"name": "Pakistan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T18:32:03.867Z",
"updatedAt": "2020-04-13T18:17:03.617Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "9r4GHFt1Gt",
"code": "PW",
"name": "Palau",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T21:13:36.847Z",
"updatedAt": "2020-04-13T18:17:16.859Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "yP5OXMfgmQ",
"code": "PS",
"name": "Palestine",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T20:42:05.390Z",
"updatedAt": "2020-04-13T18:19:26.232Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "fjNf3u1Mx1",
"code": "PA",
"name": "Panama",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T14:16:18.319Z",
"updatedAt": "2020-04-13T18:19:07.011Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "uonlBdxrxQ",
"code": "PG",
"name": "Papua New Guinea",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T15:08:57.610Z",
"updatedAt": "2020-04-13T18:17:38.915Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "4GJnHdhGyv",
"code": "PY",
"name": "Paraguay",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T21:13:49.205Z",
"updatedAt": "2020-04-13T18:18:39.043Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "8IhgzPlSIn",
"code": "PE",
"name": "Peru",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T14:32:51.766Z",
"updatedAt": "2020-04-13T18:19:11.467Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "pmnzGTREty",
"code": "PH",
"name": "Philippines",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T15:09:16.747Z",
"updatedAt": "2020-04-13T18:17:22.128Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "wo6WYeq2XC",
"code": "PN",
"name": "Pitcairn Islands",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T20:39:17.002Z",
"updatedAt": "2020-04-13T18:19:13.999Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "bejQecXKxm",
"code": "PL",
"name": "Poland",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T18:44:48.418Z",
"updatedAt": "2020-04-13T18:16:51.222Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "EZzqrmo1am",
"code": "PT",
"name": "Portugal",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T20:48:16.037Z",
"updatedAt": "2020-04-13T18:17:48.860Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "Gk9CYF6qoa",
"code": "PR",
"name": "Puerto Rico",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T20:39:25.792Z",
"updatedAt": "2020-04-13T18:19:20.638Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "fadJTpiTZO",
"code": "QA",
"name": "Qatar",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T21:15:07.602Z",
"updatedAt": "2020-04-13T18:16:29.391Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "5jipXp430E",
"code": "CG",
"name": "Republic of the Congo",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:22:35.834Z",
"updatedAt": "2020-04-13T18:17:47.903Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "5QOfVVtfWk",
"code": "RO",
"name": "Romania",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T21:15:30.722Z",
"updatedAt": "2020-04-13T18:16:51.920Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "vg1c2CxgQ3",
"code": "RU",
"name": "Russia",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T00:45:57.514Z",
"updatedAt": "2020-04-13T18:17:33.562Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "vtGcP4T5wj",
"code": "RW",
"name": "Rwanda",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:23:59.118Z",
"updatedAt": "2020-04-13T18:16:14.744Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "ZRHFFbzHPq",
"code": "RE",
"name": "Réunion",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T21:15:18.337Z",
"updatedAt": "2020-04-13T18:16:58.958Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "akNOeSv404",
"code": "BL",
"name": "Saint Barthélemy",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:14:15.129Z",
"updatedAt": "2020-04-13T18:18:57.046Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "S4rLvSxvNl",
"code": "SH",
"name": "Saint Helena",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:48:29.226Z",
"updatedAt": "2020-04-13T18:18:31.765Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "wHnODFxZFO",
"code": "KN",
"name": "Saint Kitts and Nevis",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:00:43.460Z",
"updatedAt": "2020-04-13T18:18:50.086Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "GOaMR5GKXm",
"code": "LC",
"name": "Saint Lucia",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:08:08.246Z",
"updatedAt": "2020-04-13T18:18:52.204Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "ta7ARILnW0",
"code": "MF",
"name": "Saint Martin",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:16:00.790Z",
"updatedAt": "2020-04-13T18:18:56.366Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "iiFNu3iWEe",
"code": "PM",
"name": "Saint Pierre and Miquelon",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T20:39:09.339Z",
"updatedAt": "2020-04-13T18:18:36.883Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "SaCgGB3Wn9",
"code": "VC",
"name": "Saint Vincent and the Grenadines",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T01:25:06.482Z",
"updatedAt": "2020-04-13T18:18:54.990Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "FgCSmJ0kEH",
"code": "WS",
"name": "Samoa",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T02:09:38.686Z",
"updatedAt": "2020-04-13T18:19:17.699Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "80T3vlLgy2",
"code": "SM",
"name": "San Marino",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:56:26.918Z",
"updatedAt": "2020-04-13T18:18:25.582Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "PqGe1JXHMY",
"code": "SA",
"name": "Saudi Arabia",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:24:09.226Z",
"updatedAt": "2020-04-13T18:16:17.720Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "loX389odU1",
"code": "SN",
"name": "Senegal",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:56:36.294Z",
"updatedAt": "2020-04-13T18:17:47.227Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "AqY4dkqJok",
"code": "RS",
"name": "Serbia",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T00:36:25.337Z",
"updatedAt": "2020-04-13T18:19:26.953Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "vRMloHTZn5",
"code": "SC",
"name": "Seychelles",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:25:09.327Z",
"updatedAt": "2020-04-13T18:16:25.885Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "xzEkRDMtUU",
"code": "SL",
"name": "Sierra Leone",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:55:42.883Z",
"updatedAt": "2020-04-13T18:17:57.700Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "AnLxFNCcFS",
"code": "SG",
"name": "Singapore",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:48:21.290Z",
"updatedAt": "2020-04-13T18:17:30.679Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "nc6YPq9LzZ",
"code": "SX",
"name": "Sint Maarten",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:59:05.049Z",
"updatedAt": "2020-04-13T18:19:28.759Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "2PuVugMMXs",
"code": "SK",
"name": "Slovakia",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:54:02.242Z",
"updatedAt": "2020-04-13T18:18:22.407Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "oQQC8mAbuz",
"code": "SI",
"name": "Slovenia",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:48:37.942Z",
"updatedAt": "2020-04-13T18:18:27.079Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "7LyrWI5wCC",
"code": "SB",
"name": "Solomon Islands",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:24:58.958Z",
"updatedAt": "2020-04-13T18:17:39.841Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "0ncikAUv2i",
"code": "SO",
"name": "Somalia",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:57:06.415Z",
"updatedAt": "2020-04-13T18:16:15.460Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "LQBwxAvUsE",
"code": "ZA",
"name": "South Africa",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T02:18:16.186Z",
"updatedAt": "2020-04-13T18:16:59.713Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "SyJ1XgC9NA",
"code": "GS",
"name": "South Georgia and the South Sandwich Islands",
"continent": {
"objectId": "xwS5b1G6tn",
"code": "AN",
"name": "Antarctica",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:03.515Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T02:45:17.074Z",
"updatedAt": "2020-04-13T18:18:42.907Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "H27W1K2Jx0",
"code": "KR",
"name": "South Korea",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:01:22.870Z",
"updatedAt": "2020-04-13T18:17:27.885Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "ICkEMQPTMM",
"code": "SS",
"name": "South Sudan",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:57:44.657Z",
"updatedAt": "2020-04-13T18:19:30.922Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "5Vs8zprtNC",
"code": "ES",
"name": "Spain",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:30:10.956Z",
"updatedAt": "2020-04-13T18:18:05.017Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "9N0Bhm2Ge4",
"code": "LK",
"name": "Sri Lanka",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T10:08:28.182Z",
"updatedAt": "2020-04-13T18:17:06.797Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "uPVdFzQ71M",
"code": "SD",
"name": "Sudan",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:25:20.966Z",
"updatedAt": "2020-04-13T18:16:37.091Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "iNVlDu9rb9",
"code": "SR",
"name": "Suriname",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:57:33.894Z",
"updatedAt": "2020-04-13T18:18:36.201Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "HmcygKfUvr",
"code": "SJ",
"name": "Svalbard and Jan Mayen",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:53:54.262Z",
"updatedAt": "2020-04-13T18:16:42.512Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "uVLeKcyCeh",
"code": "SZ",
"name": "Swaziland",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:04:43.362Z",
"updatedAt": "2020-04-13T18:16:58.207Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "220UohZbeo",
"code": "SE",
"name": "Sweden",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:25:56.570Z",
"updatedAt": "2020-04-13T18:18:12.033Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "c2ZdW21DZq",
"code": "CH",
"name": "Switzerland",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:22:46.742Z",
"updatedAt": "2020-04-13T18:18:11.101Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "aCjqJX3che",
"code": "SY",
"name": "Syria",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:59:13.115Z",
"updatedAt": "2020-04-13T18:16:20.729Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "0fiEmgrqKa",
"code": "ST",
"name": "São Tomé and Príncipe",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T04:58:01.766Z",
"updatedAt": "2020-04-13T18:17:58.371Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "UnNh8r7cvJ",
"code": "TW",
"name": "Taiwan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T07:10:06.622Z",
"updatedAt": "2020-04-13T18:17:21.168Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "temdDhXHMy",
"code": "TJ",
"name": "Tajikistan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:36:17.458Z",
"updatedAt": "2020-04-13T18:17:06.084Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "UIOtsTw0oX",
"code": "TZ",
"name": "Tanzania",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T07:10:26.682Z",
"updatedAt": "2020-04-13T18:16:19.996Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "k2lukc4AyV",
"code": "TH",
"name": "Thailand",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:05:49.732Z",
"updatedAt": "2020-04-13T18:17:18.469Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "LlF4qcKuXw",
"code": "TG",
"name": "Togo",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:05:36.854Z",
"updatedAt": "2020-04-13T18:17:53.838Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "xxYK5gIxUh",
"code": "TK",
"name": "Tokelau",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:37:04.132Z",
"updatedAt": "2020-04-13T18:19:15.529Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "jYnYAs4gVv",
"code": "TO",
"name": "Tonga",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:39:22.463Z",
"updatedAt": "2020-04-13T18:19:16.274Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "CseuLCM1Du",
"code": "TT",
"name": "Trinidad and Tobago",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T07:09:42.274Z",
"updatedAt": "2020-04-13T18:18:49.355Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "6FCCfIIcf0",
"code": "TN",
"name": "Tunisia",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:37:41.838Z",
"updatedAt": "2020-04-13T18:18:04.164Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "r1dBFhG3I7",
"code": "TR",
"name": "Turkey",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:39:32.070Z",
"updatedAt": "2020-04-13T18:16:34.039Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "qURMHRB5Bh",
"code": "TM",
"name": "Turkmenistan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:37:25.271Z",
"updatedAt": "2020-04-13T18:17:05.402Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "bzZECrPB6P",
"code": "TC",
"name": "Turks and Caicos Islands",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T05:04:56.409Z",
"updatedAt": "2020-04-13T18:18:52.926Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "R9v6O9hXN8",
"code": "TV",
"name": "Tuvalu",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T07:09:56.814Z",
"updatedAt": "2020-04-13T18:17:40.573Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "9noh09Cgce",
"code": "UM",
"name": "U.S. Minor Outlying Islands",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T08:14:12.164Z",
"updatedAt": "2020-04-13T18:19:22.073Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "qMGd0YmE4G",
"code": "VI",
"name": "U.S. Virgin Islands",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T01:40:07.122Z",
"updatedAt": "2020-04-13T18:19:21.362Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "VrjHD4Le7A",
"code": "UG",
"name": "Uganda",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T08:12:37.202Z",
"updatedAt": "2020-04-13T18:16:24.444Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "CzhIuuHOMH",
"code": "UA",
"name": "Ukraine",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T07:15:53.056Z",
"updatedAt": "2020-04-13T18:16:47.379Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "VqASvLCk8S",
"code": "AE",
"name": "United Arab Emirates",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:05:01.909Z",
"updatedAt": "2020-04-13T18:16:30.823Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "asMYxtQNZx",
"code": "GB",
"name": "United Kingdom",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-10T01:22:33.058Z",
"updatedAt": "2020-04-13T18:18:10.400Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "BXkZTl2omc",
"code": "US",
"name": "United States of America",
"continent": {
"objectId": "vZNZcahFvu",
"code": "NA",
"name": "North America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.294Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-11T08:14:17.654Z",
"updatedAt": "2020-04-13T18:19:25.532Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "R0GyWd9YXw",
"code": "UY",
"name": "Uruguay",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T01:20:25.534Z",
"updatedAt": "2020-04-13T18:18:40.019Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "E4wHs4HoxE",
"code": "UZ",
"name": "Uzbekistan",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T01:22:01.034Z",
"updatedAt": "2020-04-13T18:17:12.450Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "z3FhnVKZEk",
"code": "VU",
"name": "Vanuatu",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T02:09:18.894Z",
"updatedAt": "2020-04-13T18:17:42.029Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "HkXpCV8aEI",
"code": "VA",
"name": "Vatican City",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T01:24:58.858Z",
"updatedAt": "2020-04-13T18:18:24.862Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "RJHFlkiRRU",
"code": "VE",
"name": "Venezuela",
"continent": {
"objectId": "ISPUD93Or8",
"code": "SA",
"name": "South America",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:06.884Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T01:25:16.651Z",
"updatedAt": "2020-04-13T18:19:04.483Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "MFNxWtOZIm",
"code": "VN",
"name": "Vietnam",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T01:40:16.158Z",
"updatedAt": "2020-04-13T18:17:17.672Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "t6iLvc2Vki",
"code": "WF",
"name": "Wallis and Futuna",
"continent": {
"objectId": "E6LHZzkHr6",
"code": "OC",
"name": "Oceania",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:07.698Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T02:09:28.914Z",
"updatedAt": "2020-04-13T18:19:16.981Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "cRUrTJH6np",
"code": "EH",
"name": "Western Sahara",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T22:29:45.518Z",
"updatedAt": "2020-04-13T18:18:03.412Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "9tt1nNL4xu",
"code": "YE",
"name": "Yemen",
"continent": {
"objectId": "mSxk54vkg6",
"code": "AS",
"name": "Asia",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.951Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T02:10:31.538Z",
"updatedAt": "2020-04-13T18:16:16.175Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "Hf8Po3Jb1p",
"code": "ZM",
"name": "Zambia",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T02:34:00.175Z",
"updatedAt": "2020-04-13T18:16:54.050Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "hvaqvemFp8",
"code": "ZW",
"name": "Zimbabwe",
"continent": {
"objectId": "X2rEcTJnsE",
"code": "AF",
"name": "Africa",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:04.299Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-12T02:34:45.198Z",
"updatedAt": "2020-04-13T18:16:53.318Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
},
{
"objectId": "uvRzGTBaqW",
"code": "AX",
"name": "Åland",
"continent": {
"objectId": "28HX8qDZHw",
"code": "EU",
"name": "Europe",
"createdAt": "2019-12-09T20:53:12.050Z",
"updatedAt": "2019-12-12T16:08:05.613Z",
"countries": {
  "__type": "Relation",
  "className": "Country"
},
"__type": "Object",
"className": "Continent"
},
"createdAt": "2019-12-09T21:11:14.710Z",
"updatedAt": "2020-04-13T18:16:46.630Z",
"languages": {
"__type": "Relation",
"className": "Language"
},
"cities": {
"__type": "Relation",
"className": "City"
},
"timezones": {
"__type": "Relation",
"className": "Timezone_Time_Zones_Dataset"
},
"provinces": {
"__type": "Relation",
"className": "Subdivisions_States_Provinces"
}
}
]