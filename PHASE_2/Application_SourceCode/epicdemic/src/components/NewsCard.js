import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NewsCard() {
  return (
    <Card sx={{ display: 'flex', height: '97%' }} className="m-2" >
      <CardContent>
        <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary" align="center">
          38 minutes ago
        </Typography>
        <Typography component="div" align="center" sx={{ mb: 1.5 }}>
          <text style={{"font-size": "18px", "font-weight": "bold"}}>
            A plane carrying 132 passengers has crashed in southern China. Local media is reporting there are no signs of survivors.
          </text>
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary" align="center">
          Source: Google
        </Typography>
        <Button size="small">
          <Typography sx={{ fontSize: 12, mb: 1.5 }} align="center">
            Read more
          </Typography>
        </Button>
      </CardContent>

    </Card>
  );
}