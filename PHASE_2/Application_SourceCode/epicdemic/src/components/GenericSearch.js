import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from '@mui/icons-material/Search';


const GenericSearch = ({ fieldLabel, options }) => {
    return (
        <div style={{borderRadius: "25px"}}>

            <div className="searchfield-container" style={{borderRadius: "25px"}}>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <div className='search-icon'>
                        <SearchIcon fontSize='medium'></SearchIcon>
                    </div>
                    <Autocomplete
                        sx={{ width: "20vw" }}
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

            </div>
    )
}

export default GenericSearch;