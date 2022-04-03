import * as React from 'react';
import Box from '@mui/material/Box';
import { StyledSlider } from './StyledSlider';

function valuetext(value) {
  if (value < 10) {
    return `0${value}:00`;
  } else if (value == 24) {
    return '00:00';
  }
  return `${value}:00`;
}

const minDistance = 3;

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
      <StyledSlider
        size="small"
        aria-label="Time Range"
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        valueLabelFormat={value => <div>{valuetext(value)}</div>}
        step={1}
        min={0}
        max={24}
        disableSwap
      />
    </Box>
  );
}

export default SliderTime