import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `$${value}`;
}

const minDistance = 100;

const marks = [
  {
    value: 0,
    label: '$0'
  },
  {
    value: 10000,
    label: '$10,000'
  }
]

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
    <Box sx={{ width: 260 }}>
      <Slider
        size='small'
        aria-label="Time Range"
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={100}
        marks={marks}
        min={0}
        max={10000}
        disableSwap
      />
    </Box>
  );
}

export default SliderPrice