import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  if (value < 10) {
    return `0${value}:00`;
  } else if (value == 24) {
    return '00:00';
  }
  return `${value}:00`;
}

const minDistance = 1;

const marks = [
  {
    value: 0,
    label: '00:00'
  },
  {
    value: 24,
    label: '00:00'
  }
]

function SliderTime() {
  const [value, setValue] = React.useState([0, 24]);
  
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
        size="small"
        aria-label="Time Range"
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={0}
        max={24}
        disableSwap
      />
    </Box>
  );
}

export default SliderTime