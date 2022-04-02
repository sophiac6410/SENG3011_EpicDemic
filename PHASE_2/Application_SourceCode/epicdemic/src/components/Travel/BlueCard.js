import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../styles/Destination.css'

const text = "International travellers are not required to quarantine upon arrival. However, the CDC recommends that travellers stay home and self-quarantine for 7 days after arrival. Travellers should take a test again 3-5 days after arrival; if a test is not available or results are delayed, travellers are recommended to stay home and self-quarantine for a total of 10 days after travelling"
function BlueCard() {
  return(
    <Card style={{backgroundColor: "#EBF3FF", borderRadius: "20px"}} className="p-4">
    <CardContent>
      <Typography variant="h6">
      QUARANTINE RULES
      </Typography>
      <Typography sx={{ mb: 1.5 }}>
      Last updated 23/02/22
      </Typography>
      <div className='body-text'>
        {text}
      </div>
    </CardContent>
  </Card>
  )
}

export default BlueCard