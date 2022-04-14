import * as React from 'react';
import Box from '@mui/material/Box';
import { StyledSlider } from './StyledSlider';

function valuetext(value) {
  return `$${value}`;
}

const minDistance = 1500;


function SliderPrice() {
  const [value, setValue] = React.useState([0, 10000]);
  
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <Box sx={{ width: 200 }}>
      <StyledSlider
        size='small'
        aria-label="Time Range"
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        valueLabelFormat={value => <div>{valuetext(value)}</div>}
        step={100}
        min={0}
        max={10000}
        disableSwap
      />
    </Box>
  );
}

export default SliderPrice