import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NewsCard({col}) {
  return (
    <Card sx={{ display: 'flex', height: '97%', backgroundColor: col }} className="m-2" >
      <CardContent>
        <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary" align="center">
          38 minutes ago
        </Typography>
        <Typography component="div" align="center" sx={{ mb: 1.5 }}>
          <text style={{"font-size": "22px", "font-weight": "bold"}}>
            Travel restrictions easing in Japan - Now open to its neighbouring countries! 
          </text>
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary" align="center">
          Source: Google
        </Typography>
        <Button size="small" variant="text">
          <Typography sx={{ fontSize: 12, mb: 1.5 }} align="center">
            Read more
          </Typography>
        </Button>
      </CardContent>

    </Card>
  );
}