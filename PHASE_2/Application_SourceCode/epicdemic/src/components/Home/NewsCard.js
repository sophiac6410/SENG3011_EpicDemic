import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NewsCard({col, fontC, title, date, link}) {
  return (
    <Card sx={{height: '97%', backgroundColor: col, alignItems: "center", borderRadius: '20px' }} className="m-2" >
      <CardContent sx={{position: 'relative', py: 3, px: 3, top: '20%'}}>
        <Typography variant="bodyText" sx={{ pb: 2, color: fontC }} align="center">
          {date}
        </Typography>
        <Typography variant="bodyHeading" style={{marginBottom: 1.5, color: fontC}} align="center">
          {/* <text style={{"font-size": "22px", "font-weight": "bold"}}> */}
            {title}
          {/* </text> */}
        </Typography>
        <Typography variant="bodyText" sx={{mb: 1.5 }} color={fontC} align="center" className="mt-4">
          Source: traveldailynews
        </Typography>
        {/* <Button size="small" variant="text" align="center"> */}
          <Typography variant="bodyText" sx={{mb: 1.5, textDecoration: 'underline', cursor: 'pointer' }} align="center" color={fontC} onClick={() => { window.open(link)}}>
            Read more
          </Typography>
        {/* </Button> */}
      </CardContent>

    </Card>
  );
}