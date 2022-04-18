import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "react-multi-carousel/lib/styles.css";
import { Col, Row } from 'react-bootstrap';

export function CitySelectPhilippines({fieldLabel, city}) {
  return (
    <Row className='justify-content-center align-items-center'>
      <Col>
        <Autocomplete
          id="city-philippines-select-demo"
          // sx={{ width: 250 }}
          options={iatas}
          defaultValue={city}
          autoHighlight
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              {/* <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              /> */}
              {option}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              id="standard-basic" 
              variant="standard"
              {...params}
              label={fieldLabel}
              defaultValue={city}
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


export function CitySelectSydney({fieldLabel}) {
    return (
      <Row className='justify-content-center align-items-center'>
        <Col>
          <Autocomplete
            id="city-philippines-select-demo"
            // sx={{ width: 250 }}
            options={iatas}
            autoHighlight
            getOptionLabel={(option) => option}
            defaultValue={iatas[0]}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {/* <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                /> */}
                {option}
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
  
  const iatas = [
    "SYD",
    "AAL",
    "ABZ",
    "MAD",
    "ALC",
    "AMS",
    "BCN",
    "BRI",
    "BFS",
    "BEG",
    "BGO",
    "SXF",
    "TXL",
    "BLL",
    "BHX",
    "BOO",
    "BLQ",
    "BOD",
    "KBP",
    "BOH",
    "BRE",
    "BRS",
    "BRU",
    "CRL",
    "BUD",
    "BOJ",
    "CAG",
    "CWL",
    "CTA",
    "CDG",
    "CIA",
    "CGN",
    "CPH",
    "WRO",
    "ORK",
    "DME",
    "DTM",
    "DRS",
    "DUB",
    "DUS",
    "EMA",
    "EDI",
    "EIN",
    "ATH",
    "BSL",
    "EXT",
    "PMO",
    "FAO",
    "OPO",
    "FRA",
    "GDN",
    "GVA",
    "GOA",
    "BHD",
    "GLA",
    "GOT",
    "LPA",
    "GRV",
    "HAM",
    "HAJ",
    "HEL",
    "OTP",
    "HER",
    "LIS",
    "BGY",
    "PDL",
    "FKB",
    "KTW",
    "KZN",
    "KEF",
    "HRK",
    "KRK",
    "KUF",
    "SPC",
    "TER",
    "LBA",
    "LEJ",
    "TLL",
    "FCO",
    "LGG",
    "LPL",
    "LJU",
    "LGW",
    "LHR",
    "LTN",
    "STN",
    "LLA",
    "LUX",
    "LYS",
    "BTS",
    "AGP",
    "MMX",
    "MXP",
    "MLA",
    "MAN",
    "MRS",
    "LIN",
    "MSQ",
    "WMI",
    "MUC",
    "FMO",
    "NAP",
    "NCL",
    "NCE",
    "NWI",
    "NUE",
    "ODS",
    "OSL",
    "PMI",
    "ORY",
    "PSA",
    "ROV",
    "TGD",
    "POZ",
    "PRN",
    "LED",
    "AKT",
    "BZZ",
    "FFD",
    "LKZ",
    "MHZ",
    "RMS",
    "RIX",
    "DSA",
    "SCQ",
    "SJJ",
    "SNN",
    "SVO",
    "SIP",
    "SKP",
    "AER",
    "SOF",
    "SOU",
    "SVG",
    "ARN",
    "STR",
    "TFN",
    "TFS",
    "SKG",
    "TIA",
    "TLS",
    "TSF",
    "TOS",
    "TRD",
    "TRN",
    "UFA",
    "PRG",
    "VAR",
    "VCE",
    "VRN",
    "VIE",
    "VNO",
    "VKO",
    "WAW",
    "KJA",
    "ZAG",
    "ZIA",
    "ZRH",
  ]