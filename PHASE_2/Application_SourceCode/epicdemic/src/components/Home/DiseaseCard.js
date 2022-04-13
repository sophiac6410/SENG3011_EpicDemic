import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LightButton } from '../../styles/Button';

export default function DiseaseCard() {
  return (
    <Card className="m-2" sx={{ borderRadius: '10px', padding: '4%', paddingBottom: '0.5%' }} >
      <CardContent>
        <Typography variant="caption" color="text.secondary">
          Published 29th March 2022
        </Typography>
        <Typography variant="bodyHeading" component="div" align="left" sx={{ mb: 1 }}>
            Bacterial black spot, mango - Ghana 
        </Typography>
        <Typography variant="bodyText" sx={{display: 'block'}}>
          Ghana's mango sector is in dire straits. It is faced with bacterial black spot (BBS) in mango crops, a serious disease that has overwhelmed many farmers. 
        </Typography>
        <LightButton size="small" align="left" sx={{ padding: '2% 4%', my: 2 }}>
          <Typography variant='bodyImportant'>
            Read more
          </Typography>
        </LightButton>
        <Typography variant="caption" color="text.secondary" sx={{display: 'block'}} gutterBottom>
          Source: Promed
        </Typography>
      </CardContent>

    </Card>
  );
}