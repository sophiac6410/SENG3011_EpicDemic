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

const GenericSearch = ({ region, options, placeholder, handleInput }) => {
    const classes = useStyles();
    return (
        <div className="searchfield-container bg-white border-radius-large">
            <div style={{ display: "flex", alignItems: "center", flexDirection: "row"}} className="pe-1">
                <div className="me-3">
                </div>
                <Autocomplete
                    sx={{ width: 200 }}
                    classes={classes}
                    popupIcon={""}
                    value={region}
                    options={options}
                    id="disable-clearable"
                    disableClearable
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

export default GenericSearch;
