import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NewsCard({col, fontC}) {
  return (
    <Card sx={{ display: 'flex', height: '97%', backgroundColor: col, alignItems: "center", borderRadius: '10px' }} className="m-2" >
      <CardContent>
        <Typography sx={{ fontSize: 16, mb: 1.5 }} color={fontC} align="center">
          38 minutes ago
        </Typography>
        <Typography component="div" align="center" sx={{ mb: 1.5 }} color={fontC} className="mt-4">
          <text style={{"font-size": "22px", "font-weight": "bold"}}>
            Travel restrictions easing in Japan - Now open to its neighbouring countries! 
          </text>
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 16, mb: 1.5 }} color={fontC} align="center" className="mt-4">
          Source: Google
        </Typography>
        {/* <Button size="small" variant="text" align="center"> */}
          <Typography sx={{ fontSize: 14, mb: 1.5 }} align="center" color={fontC}>
            Read more
          </Typography>
        {/* </Button> */}
      </CardContent>

    </Card>
  );
}