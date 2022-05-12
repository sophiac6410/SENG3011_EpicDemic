import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../styles/Destination.css'
import { areIntervalsOverlapping } from 'date-fns';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function BlueCard(props) {
  console.log(props)
  const [open, setOpen] = React.useState(props.open);
  
  function isOpen() {
    if (open) {
      return 'block';
    } else {
      return 'none';
    }
  }
  return(
    // <Col md={6}>
    <div className="m-2 mb-4 border-radius-med shadow">
      <div className="bg-light-blue p-4 ps-5 d-flex" style={{width: '100%', cursor: 'pointer'}} onClick={() => {setOpen(!open)}}>
        <div className="justify-content-start" style={{flex: 8}}>
          <Typography variant="bodyHeading">{props.check.title}</Typography>
          <Typography variant="caption">
            {props.check.date ? (
              <div>Last Update {props.check.date}</div>
            ): (
              <div></div>
            )}
          </Typography>
        </div>
        <div className="justify-content-end pt-1" style={{flex: 1}}>
          { open ? <KeyboardArrowUpIcon sx={{color: '#1B4965', justifyContent: 'end'}}/>
            : <KeyboardArrowDownIcon sx={{color: '#1B4965', justifyContent: 'end'}}/>
          }
        </div>
      </div>
      <div className="p-4" style={{ maxHeight: '300px', overflow: "auto", display: isOpen()}}>
        {props.check.text}
        {/* <Typography variant="bodyText">{props.check.text} */}
          {/* <div dangerouslySetInnerHTML={{__html: props.check.text}}></div> */}
          {/* {props.check.text} */}
        {/* </Typography> */}
      </div>
    </div>
    // </Col>
  )
}

export default BlueCard