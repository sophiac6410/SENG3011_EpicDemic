import React from 'react'
import Modal from '@mui/material/Modal';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const styleThree = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40vw",
  minWidth: '550px',
  height: "90vh",
  bgcolor: 'background.paper',
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#F4FBFF",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "80px",
};

function ChecklistItem({item}) {
  const [checked, setChecked] = React.useState(item.checked);
  const handleClick = () => {
    setChecked(!checked);
  }
  return <FormControlLabel
    sx={{display: 'block'}}
    label={item.item}
    control={
      <Checkbox
        checked={checked}
        onClick={handleClick}
        icon={<CheckBoxOutlineBlankIcon className="color-medium-teal"/>}
        checkedIcon={<CheckBoxIcon className="color-medium-teal"/>}
      />
    }   
  />
}

function ChecklistGroup({group}) {
  const [open, setOpen] = React.useState(true);
  function isOpen() {
    if (open) {
      return 'block';
    } else {
      return 'none';
    }
  }
  return (
    <div className="border-radius-med px-5 py-4 bg-white mb-4">
      <div className="d-flex" onClick={() => {setOpen(!open)}} style={{cursor: 'pointer'}}>
        <div className="justify-content-start" style={{flex: 10}}>
          <Typography variant="heading3" className="color-dark-teal">{group.name}</Typography>
        </div>
        <div className="justify-content-end" style={{flex: 1}}>
          { open ? <KeyboardArrowUpIcon className="color-medium-teal" sx={{justifyContent: 'end'}}/>
            : <KeyboardArrowDownIcon className="color-medium-teal" sx={{justifyContent: 'end'}}/>
          }
        </div>
      </div>
      <FormGroup sx={{display: isOpen(), mt: 3}}>
        {group.items.map((item, i) => {
          return <ChecklistItem key={i} item={item}/>
        })}
      </FormGroup>
    </div>
  )
}

function ChecklistModal({checklist, city}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(city)
  return (
    <>
    <IconButton sx={{marginLeft: "5px"}} onClick={handleOpen}>
      <CheckBoxOutlineBlankIcon sx={{marginLeft: "5px"}} color='teal'></CheckBoxOutlineBlankIcon>
    </IconButton>
    <Typography variant='caption' className='color-medium-teal' sx={{cursor: 'pointer'}} onClick={handleOpen}>Ready to travel</Typography>
    <Modal
      open={open}
      onClose={handleClose}
      scroll='body'
      aria-labelledby="checklist-dialog"
    >
      <Box sx={styleThree}>
        <div style={{display: "flex", justifyContent: "end", flexDirection: "row", alignItems: "center"}}>
          <IconButton onClick={handleClose}>
            <CloseIcon color='teal' fontSize="small"></CloseIcon>
          </IconButton>
        </div>
        <Typography variant="heading1" className="color-dark-teal" sx={{textAlign: 'center', lineHeight: 0}}>Checklist</Typography>
        <div style={{justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
          <Typography variant="heading2" className="color-dark-teal" sx={{textAlign: 'center', lineHeight: 4}}>{city.city_name}, {city.country_name}</Typography>
        </div>
        <div className="border-radius-med" style={{overflow: 'auto'}}>
          {checklist.map((group, i) => {
            return <ChecklistGroup key={i} group={group}/>
          })}
        </div>
      </Box>
    </Modal>
    </>
  )
}

export default ChecklistModal