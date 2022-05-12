import * as React from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import new_cases from "../../static/new_cases.jpg"
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import "../../styles/Home.css"
import { Typography } from '@mui/material';
import Switch from "react-switch";
import { Row, Col, Image } from "react-bootstrap";

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 10px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  max-width: 200px;
  background-color: #D8E7FF;
  border-radius: 10px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-content: space-between;
`;

export default function CovidTabs({casesChartData}) {
  const [checked, setChecked] = React.useState(false);
  const mediumTeal = '#0F83A0';
  const mediumBlue = '#70C4E8';
  const lightTeal = '#62B6CB';
  const darkTeal = '#1B4965';
  return (
    <div className="covidtabs border-radius-med shadow">
      <div style={{ width: '300px' }}>
      <div className="pb-4 pt-4 pe-4 d-flex">
        <div className="mx-5" style={{flex: 1}}>
          <Typography variant="title" className="color-dark-grey">{checked ? 'Deaths' : 'Cases'}</Typography>
        </div>
        <div style={{flex: 1, display: 'flex', marginLeft: '250px'}}>
          <div>
            <Typography variant="bodyHeading" sx={{textAlign: 'right'}}>Cases</Typography>
          </div>
          <div className="mx-3">
            <Switch
              checked={checked}
              onChange={() => setChecked(!checked)}
              onColor={lightTeal}
              onHandleColor={mediumTeal}
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={48}
              className="react-switch align-self-center"
              id="material-switch"
              />
          </div>
          <div>
            <Typography variant="bodyHeading">Deaths</Typography>
          </div>
        </div>
      </div>
      {
        !checked 
        ? <>
          <LineChart width={650} height={450} data={casesChartData}>
            <Line type="monotone" dataKey="data" stroke="#0F83A0"/>
            <XAxis dataKey="name" tickCount={casesChartData.length}/>
            <YAxis tickFormatter={DataFormatter}/>
          </LineChart>
          </>
        : <>
            <img src={new_cases} style={{ width: "650px" }}></img>
          </>
      }
      {/* <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab><Typography variant="bodyHeading">Cases</Typography></Tab>
          <Tab><Typography variant="bodyHeading">Deaths</Typography></Tab>
        </TabsList>
        <TabPanel value={0}>
          <Typography variant="title" className="color-dark-grey">Cases</Typography>
          <LineChart width={650} height={450} data={casesChartData}>
            <Line type="monotone" dataKey="data" stroke="#0F83A0"/>
            <XAxis dataKey="name" tickCount={casesChartData.length}/>
            <YAxis tickFormatter={DataFormatter}/>
          </LineChart>
          <img src={new_cases} style={{ width: "900px" }}></img>
        </TabPanel>
        <TabPanel value={1}>
          <Typography variant="title" className="color-dark-grey">Deaths</Typography>
            <img src={new_cases} style={{ width: "650px" }}></img>
        </TabPanel>
      </TabsUnstyled> */}
      </div>
    </div>
  );
}

// https://stackoverflow.com/questions/52320447/recharts-set-y-axis-value-base-of-number-displayed
const DataFormatter = (number) => {
  if(number > 1000000000){
    return (number/1000000000).toString() + 'B';
  }else if(number > 1000000){
    return (number/1000000).toString() + 'M';
  }else if(number > 1000){
    return (number/1000).toString() + 'K';
  }else{
    return number.toString();
  }
}