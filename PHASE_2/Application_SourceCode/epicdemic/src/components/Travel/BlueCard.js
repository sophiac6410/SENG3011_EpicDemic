import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../styles/Destination.css'

function BlueCard(props) {
  console.log(props)
  return(
    // <Col md={6}>
      <Card style={{backgroundColor: "#EBF3FF", borderRadius: "30px"}} sx={{ display: 'flex', height: '97%' }} className="p-4 m-2" >
      <CardContent>
        <Typography variant="bodyHeading">{props.check.title}</Typography>
        <Typography variant="caption" sx={{ mb: 1.5 }}>
        {props.check.date}
        </Typography>
        <Typography variant="bodyText">
          {props.check.text}
        </Typography>
        </CardContent>
      </Card>
    // </Col>
  )
}

export default BlueCard