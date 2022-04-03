import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "react-multi-carousel/lib/styles.css";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Col, Row } from 'react-bootstrap';
import PlaneLanding from '../../static/planeLanding.svg';
import PlaneTakeOff from '../../static/planeTakeOff.svg';

export function CitySelectPhilippines({fieldLabel}) {
  return (
    <Row className='justify-content-center align-items-center'>
      <Col>
        <Autocomplete
          id="city-philippines-select-demo"
          // sx={{ width: 250 }}
          options={citiesPhilippines}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              {/* <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              /> */}
              {option.label} ({option.code})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              id="standard-basic" 
              variant="standard"
              {...params}
              label={fieldLabel}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Col>
    </Row>
  );
}

const citiesPhilippines = [
    { code: 'MNL', label: 'Manila'},
    { code: 'CEB', label: 'Mactan-Cebu'},
    { code: 'ILO', label: 'Iloio'},
    { code: 'DVO', label: 'Davao'},
    { code: 'CRK', label: 'Clark'},
    { code: 'PPS', label: 'Puerto Princesa'},
    { code: 'CGY', label: 'Languindingan'},
    { code: 'BCD', label: 'Bacolod-Silay'},
    { code: 'TAC', label: 'Tacloban City'},
    { code: 'KLO', label: 'Kalibo'},
    { code: 'ZAM', label: 'Zamboanga'},
    { code: 'TAG', label: 'Bohol-Panglao'},
    { code: 'GES', label: 'General Santos'},
    { code: 'MPH', label: 'Boracay'},
]

export function CitySelectSydney({fieldLabel}) {
    return (
      <Row className='justify-content-center align-items-center'>
        <Col>
          <Autocomplete
            id="city-philippines-select-demo"
            // sx={{ width: 250 }}
            options={citiesSydney}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {/* <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                /> */}
                {option.label} ({option.code})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                id="standard-basic" 
                variant="standard"
                {...params}
                label={fieldLabel}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Col>
      </Row>
    );
  }
  
  const citiesSydney = [
      { code: 'ADL', label: 'Adelaide'},
      { code: 'BNE', label: 'Brisbane'},
      { code: 'CBR', label: 'Canberra'},
      { code: 'MEL', label: 'Melbourne'},
      { code: 'PER', label: 'Perth'},
      { code: 'SYD', label: 'Sydney'}
  ]