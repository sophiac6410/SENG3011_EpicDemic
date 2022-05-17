import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";

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
    }
  }));

const GenericSearch = ({ fieldLabel, options, handleInput }) => {
    const classes = useStyles();
    return (
        <div style={{backgroundColor: "white", borderRadius: "15px", border: "1px solid #0F83A0"}}>
            <div className="search-row" style={{ display: "flex", alignItems: "center", flexDirection: "row"}}>
                <Autocomplete
                    sx={{ width: 200 }}
                    classes={classes}
                    options={options}
                    autoHighlight
                    onChange={handleInput}
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.label}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            variant="standard"
                            {...params}
                            label={fieldLabel}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'off'
                            }}
                        />
                        )}
                        />
            </div>
        </div>

    )
}

export default GenericSearch;