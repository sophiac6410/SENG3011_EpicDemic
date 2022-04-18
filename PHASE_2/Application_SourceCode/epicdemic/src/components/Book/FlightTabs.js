import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FlightDeal from './FlightDeal';
import { TailSpin } from  'react-loader-spinner'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FlightTabs({Deflights, Reflights, depart, dest, loading}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="flight-tabs" centered>
          <Tab label="Departing Flights" {...a11yProps(0)} />
          <Tab label="Return Flights" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{
        height: '800px',
        overflow: 'scroll'
      }}>
        <div style={{display: loading ? "flex" : "none"}} className="flex-row justify-content-center align-items-center">
          <TailSpin color='#70C4E8'></TailSpin>
        </div>
        <div style={{display: loading ? "none" : "block"}}>
          {Deflights.map((flight)=> 
            <FlightDeal key={flight.id} data={flight} depart={depart} dest={dest}></FlightDeal>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} style={{
        height: '800px',
        overflow: 'scroll'
      }}>
        <div style={{display: loading ? "flex" : "none"}} className="flex-row justify-content-center align-items-center">
          <TailSpin color='#70C4E8'></TailSpin>
        </div>
        <div style={{display: loading ? "none" : "block"}}>
          {Reflights.map((flight)=> 
            <FlightDeal key={flight.id} data={flight} depart={depart} dest={dest}></FlightDeal>
          )}
        </div>
      </TabPanel>
    </Box>
  );
}