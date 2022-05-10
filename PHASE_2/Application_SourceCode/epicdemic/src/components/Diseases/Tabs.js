import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import data from './data.js'

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

export default function FullWidthTabs({disease}) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [govPolicy, setGovPolicy] = useState("");
  const { code } = useParams();
  const [diseaseNum, setDiseaseNum] = useState(0);

  useEffect(() => {
    if (code === null) return;

    if (disease == 'Dengue') {
      setDiseaseNum(1);
    }
    else if (disease == 'HIV/AIDS') {
      setDiseaseNum(2);
    }
    else {
      setDiseaseNum(0);
      async function fetchData() {
        const travel = await fetch(`http://127.0.0.1:8000/v1/locations/${code}/travel`).then(res => res.json())
      
        setGovPolicy(travel.data.testing.text);
      }
      fetchData();
    } 


  }, [code, disease])

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
          <Typography variant="bodyText">
            {data[diseaseNum]['about']}
          </Typography>
          <br/>
          <Typography variant="bodyText">
            How it spreads:
          </Typography>
          <Typography variant="bodyText">
            {data[diseaseNum]['method']}
          </Typography>
          <br />
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
        <ul>
        {data[diseaseNum]['symptoms'].map((val, idx) => {
          return (<li><Typography variant="bodyText"> {val} </Typography> </li>)
        })}
        </ul>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          { diseaseNum == 0 ? <Typography variant="bodyText">{govPolicy}</Typography> : <Typography variant="bodyText"> Nothing specified </Typography> }
        </TabPanel>
    </div>
  );
}