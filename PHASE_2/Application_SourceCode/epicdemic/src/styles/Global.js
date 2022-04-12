import React from 'react';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';

const mediumTeal = '#0F83A0';
const lightTeal = '#62B6CB';
const mediumBlue = '#70C4E8';
const darkTeal = '#1B4965';
const lightGrey = '#EEF0F2';
const lightBlue = '#E2F2FC';
const darkGrey = '#515151';
const brSmall = '30px';

const BaseButton = styled(Button)({
  borderRadius: brSmall,
  padding: '15px 25px',
});

export const DarkButton = styled(BaseButton)({
  backgroundColor: darkTeal,
  color: 'white',
  '&:hover': {
    backgroundColor: '#1c608a',
  },
});

export const LightButton = styled(BaseButton)({
  backgroundColor: mediumBlue,
  color: 'white',
  '&:hover': {
    backgroundColor: '#2cb1eb',
  },
});