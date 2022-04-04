import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../styles/Destination.css'
import { Col } from 'react-bootstrap';

function BlueCard(props) {
  console.log(props)
  return(
    // <Col md={6}>
      <Card style={{backgroundColor: "#EBF3FF", borderRadius: "20px"}} sx={{ display: 'flex', height: '97%' }} className="p-4 m-2" >
      <CardContent>
        <Typography variant="h6" style={{fontWeight:"bold", fontSize: "22px"}}>
        {props.check.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
        {props.check.date}
        </Typography>
        <div className='body-text'>
          {props.check.text}
        </div>
        </CardContent>
      </Card>
    // </Col>
  )
}

export default BlueCard