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
      fontSize: "1em",
      marginBottom: "6px",
    //   width: "90%"
    }
  }));

const GenericSearch = ({ fieldLabel, options }) => {
    const classes = useStyles();
    return (
        <div className="searchfield-container bg-white border-radius-large">
            <div style={{ display: "flex", alignItems: "center", flexDirection: "row"}} className="pe-1">
                <div className="me-3">
                    <SearchIcon fontSize='medium'></SearchIcon>
                </div>
                <Autocomplete
                    sx={{ width: 200 }}
                    classes={classes}
                    options={options}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                            loading="lazy"
                            width="20"
                            src={`${option.imageUrl}`}
                            srcSet={`${option.imageUrl}`}
                            alt=""
                            />
                            {option.label} ({option.code})
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            variant="standard"
                            {...params}
                            label={fieldLabel}
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

export default GenericSearch;