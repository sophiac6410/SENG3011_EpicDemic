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
        borderBottom: "2px solid white"
      },
      "&.MuiInput-underline:hover:before": {
        borderBottom: "2px solid white"
      },
      "&.MuiInput-underline:after": {
        borderBottom: "2px solid white"
      },
      fontFamily: "Open Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "0.9em",
      marginBottom: "6px",
    //   width: "90%"
    }
  }));

export default function CountrySelect({handleInput}) {
  const classes = useStyles();

  return (
    <div style={{display: "flex", alignItems: "center", flexDirection: "row", padding: '1%' }}>
      <Autocomplete
        classes={classes}
        sx={{ width: 250 }}
        options={countries}
        popupIcon={""}
        autoHighlight
        onChange={handleInput}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 1, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            placeholder={'Search a travel destination...'}
            variant="standard"
            size="large"
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off', // disable autocomplete and autofill
            }}
          />
        )}
      />
    </div>
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  // { code: 'AD', label: 'Andorra', phone: '376' },
  // {
  //   code: 'AE',
  //   label: 'United Arab Emirates',
  //   phone: '971',
  // },
  // { code: 'AF', label: 'Afghanistan', phone: '93' },
  // {
  //   code: 'AG',
  //   label: 'Antigua and Barbuda',
  //   phone: '1-268',
  // },
  // { code: 'AI', label: 'Anguilla', phone: '1-264' },
  // { code: 'AL', label: 'Albania', phone: '355' },
  // { code: 'AM', label: 'Armenia', phone: '374' },
  // { code: 'AO', label: 'Angola', phone: '244' },
  // { code: 'AQ', label: 'Antarctica', phone: '672' },
  // { code: 'AR', label: 'Argentina', phone: '54' },
  // { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  // {
  //   code: 'AU',
  //   label: 'Australia',
  //   phone: '61',
  //   suggested: true,
  // },
  // { code: 'AW', label: 'Aruba', phone: '297' },
  // { code: 'AX', label: 'Alland Islands', phone: '358' },
  // { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  // {
  //   code: 'BA',
  //   label: 'Bosnia and Herzegovina',
  //   phone: '387',
  // },
  // { code: 'BB', label: 'Barbados', phone: '1-246' },
  // { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  // { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },

  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true,
  },
  // { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  // { code: 'DM', label: 'Dominica', phone: '1-767' },
  // {
  //   code: 'DO',
  //   label: 'Dominican Republic',
  //   phone: '1-809',
  // },
  // { code: 'DZ', label: 'Algeria', phone: '213' },
  // { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  // { code: 'EG', label: 'Egypt', phone: '20' },
  // { code: 'EH', label: 'Western Sahara', phone: '212' },
  // { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  // { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  // { code: 'FJ', label: 'Fiji', phone: '679' },
  // {
  //   code: 'FK',
  //   label: 'Falkland Islands (Malvinas)',
  //   phone: '500',
  // },
  // {
  //   code: 'FM',
  //   label: 'Micronesia, Federated States of',
  //   phone: '691',
  // },
  // { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true,
  },
  // { code: 'GA', label: 'Gabon', phone: '241' },
  // { code: 'GB', label: 'United Kingdom', phone: '44' },
  // { code: 'GD', label: 'Grenada', phone: '1-473' },
  // { code: 'GE', label: 'Georgia', phone: '995' },
  // { code: 'GF', label: 'French Guiana', phone: '594' },
  // { code: 'GG', label: 'Guernsey', phone: '44' },
  // { code: 'GH', label: 'Ghana', phone: '233' },
  // { code: 'GI', label: 'Gibraltar', phone: '350' },
  // { code: 'GL', label: 'Greenland', phone: '299' },
  // { code: 'GM', label: 'Gambia', phone: '220' },
  // { code: 'GN', label: 'Guinea', phone: '224' },
  // { code: 'GP', label: 'Guadeloupe', phone: '590' },
  // { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  // {
  //   code: 'GS',
  //   label: 'South Georgia and the South Sandwich Islands',
  //   phone: '500',
  // },
  // { code: 'GT', label: 'Guatemala', phone: '502' },
  // { code: 'GU', label: 'Guam', phone: '1-671' },
  // { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  // { code: 'GY', label: 'Guyana', phone: '592' },
  // { code: 'HK', label: 'Hong Kong', phone: '852' },
  // {
  //   code: 'HM',
  //   label: 'Heard Island and McDonald Islands',
  //   phone: '672',
  // },
  // { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  // { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  // { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IT', label: 'Italy', phone: '39' },

  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },

  { code: 'MT', label: 'Malta', phone: '356' },

  { code: 'NL', label: 'Netherlands', phone: '31' },

  { code: 'PT', label: 'Portugal', phone: '351' },

  { code: 'RO', label: 'Romania', phone: '40' },

  { code: 'SE', label: 'Sweden', phone: '46' },

  { code: 'SI', label: 'Slovenia', phone: '386' },

  { code: 'SK', label: 'Slovakia', phone: '421' },

  { code: 'US', label: 'United States of America', phone: '1' }
];
