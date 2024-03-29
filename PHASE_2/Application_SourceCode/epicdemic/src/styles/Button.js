import React from 'react';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const mediumTeal = '#0F83A0';
const lightTeal = '#62B6CB';
const mediumBlue = '#70C4E8';
const darkTeal = '#1B4965';
const lightGrey = '#EEF0F2';
const lightBlue = '#E2F2FC';
const darkGrey = '#515151';
const brSmall = '30px';
const white = '#ffff';


const BaseButton = styled(Button)({
  borderRadius: brSmall,
  padding: '10px 20px',
  fontFamily: 'Nunito',
});

export const DarkButton = styled(BaseButton)({
  backgroundColor: darkTeal,
  color: 'white',
  '&:hover': {
    backgroundColor: darkGrey,
  },
});

export const LightButton = styled(BaseButton)({
  backgroundColor: lightTeal,
  color: 'white',
  '&:hover': {
    backgroundColor: darkTeal,
  },
});

export const WhiteButton = styled(BaseButton)({
  backgroundColor: lightBlue,
  color: darkTeal,
  '&:hover': {
    backgroundColor: lightGrey,
  },
});

const NotActiveDestinationTabs = styled(BaseButton) ({
  variant: "outlined",
  color: lightTeal,
  border: '3px solid',
  fontWeight: "bold",
  '&:hover': {
    backgroundColor: lightTeal,
    color: "white",
    border: '3px solid',
    variant: "outlined",
    fontWeight: "bold",
  }
})
const ActiveDestinationTab = styled(BaseButton) ({
  backgroundColor: lightTeal,
  color: "white",
  border: '3px solid',
  variant: "outlined",
  fontWeight: "bold",
  '&:hover': {
    backgroundColor: lightTeal,
    color: "white",
    border: '3px solid',
    variant: "outlined",
    fontWeight: "bold",
  }
})
export function DestinationTabs(props) {
  DestinationTabs.propTypes = {active: PropTypes.bool, name: PropTypes.string}
  if (props.active) {
    return <ActiveDestinationTab>{props.name}</ActiveDestinationTab>
  } else {
    return <NotActiveDestinationTabs>{props.name}</NotActiveDestinationTabs>
  }
}
export const TealBotton = styled(BaseButton)({
  backgroundColor: mediumTeal,
  paddingLeft: "30px",
  paddingRight: "30px",
  color: white,
  '&:hover': {
    backgroundColor: darkTeal,
  },
});
