import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function DiseaseCard() {
  return (
    <Card className="m-2" style={{borderRadius: '10px', padding: '20px'}} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Published 29th March 2022
        </Typography>
        <Typography component="div" align="left" sx={{ mb: 1 }}>
          <text style={{"font-size": "22px", "font-weight": "bold"}}>
            Bacterial black spot, mango - Ghana 
          </text>
        </Typography>
        <Typography variant="body2">
          Ghana's mango sector is in dire straits. It is faced with bacterial black spot (BBS) in mango crops, a serious disease that has overwhelmed many farmers. 
        </Typography>
        <Button size="small" align="left" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <Typography sx={{ fontSize: 12}} align="left">
            Read more
          </Typography>
        </Button>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Source: Promed
        </Typography>
      </CardContent>

    </Card>
  );
}