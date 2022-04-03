import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FlightDeal from './FlightDeal';

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

export default function FlightTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', margin: '10px 20px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="flight-tabs" centered>
          <Tab label="Departing Flights" {...a11yProps(0)} />
          <Tab label="Return Flights" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{
        height: '550px',
        overflow: 'scroll'
      }}>
        <div >
          <FlightDeal></FlightDeal>
          <FlightDeal></FlightDeal>
          <FlightDeal></FlightDeal>
          <FlightDeal></FlightDeal>
          <FlightDeal></FlightDeal>
          <FlightDeal></FlightDeal>
          <FlightDeal></FlightDeal>
          <FlightDeal></FlightDeal>
          <FlightDeal></FlightDeal>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} style={{
        height: '550px',
        overflow: 'scroll'
      }}>
      <FlightDeal></FlightDeal>
        <FlightDeal></FlightDeal>
        <FlightDeal></FlightDeal>
        <FlightDeal></FlightDeal>
        <FlightDeal></FlightDeal>
        <FlightDeal></FlightDeal>
        <FlightDeal></FlightDeal>
        <FlightDeal></FlightDeal>
        <FlightDeal></FlightDeal>
      </TabPanel>
    </Box>
  );
}