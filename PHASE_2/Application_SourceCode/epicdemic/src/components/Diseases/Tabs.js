import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import '../../styles/Covid.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className='tab-bg'>
      <AppBar position="static" elevation={0} style={{ background: 'snow' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Symptoms" {...a11yProps(1)} />
          <Tab label="Government Policy" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="body-text">
            Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.
            Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention.
          </div>
          <br/>
          <div className="larger-body">
            How it spreads:
          </div>
          <div className="body-text">
            The virus can spread from an infected person’s mouth or nose in small liquid particles when they cough, sneeze, speak, sing or breathe. These particles range from larger respiratory droplets to smaller aerosols.
          </div>
          <br />
          <div className="body-text">
            You can be infected by breathing in the virus if you are near someone who has COVID-19, or by touching a contaminated surface and then your eyes, nose or mouth. The virus spreads more easily indoors and in crowded settings.
          </div>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
        <ul>
          <li> <div className="body-text"> Cough </div> </li>
          <li> <div className="body-text"> Runny Nose </div> </li>
          <li> <div className="body-text"> High Fever </div> </li>
          <li> <div className="body-text"> Loss sense of smell and taste </div> </li>
        </ul>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="body-text"> If you are positive with COVID-19, you must isolate at home for 7 days after a positive PCR/RAT test. </div> 
        </TabPanel>
    </div>
  );
}