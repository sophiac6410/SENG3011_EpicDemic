import React from 'react'
import Modal from '@mui/material/Modal';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TealBotton } from '../../styles/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import { addNewItem, addNewGroup } from './ChecklistApiCalls';
import { getTripCityById } from './tripApiCalls';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const mainModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50vw",
  minWidth: '550px',
  height: "90vh",
  bgcolor: 'background.paper',
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#F4FBFF",
  display: "flex",
  flexDirection: "column",
};

const popUp = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "45vw",
  minWidth: '300px',
  height: "80vh",
  bgcolor: 'background.paper',
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
}

const popUpNewGroup = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40vw",
  minWidth: '300px',
  height: "40vh",
  bgcolor: 'background.paper',
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
}

const popUpDescription = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40vw",
  minWidth: '300px',
  height: "50vh",
  bgcolor: 'background.paper',
  borderRadius: "30px",
  boxShadow: 24,
  px: 4,
  py: 3,
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
}


function ChecklistItem({item}) {
  const [checked, setChecked] = React.useState(item.checked);
  const [openDescription, setOpenDescription] = React.useState(false);
  const [description, setDescription] = React.useState(item.description ? item.description : '');
  const handleClick = () => {
    setChecked(!checked);
  }
  const handleOpenDescription = () => {
    setOpenDescription(true);
  }
  const handleCloseDescription = () => {
    setOpenDescription(false);
  }
  const handleSaveDescription = () => {
    handleCloseDescription();
  }
  return <>
  <FormControlLabel
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
  <IconButton onClick={handleOpenDescription}>
    <MoreHorizIcon className="color-dark-teal"/>
  </IconButton>
  <Modal
    open={openDescription}
    onClose={handleCloseDescription}
    scroll='body'
    aria-labelledby="checklist-dialog"
  >
    <Box sx={popUpDescription}>
      <div style={{display: "flex", justifyContent: "end", flexDirection: "row", alignItems: "center"}}>
        <IconButton onClick={handleCloseDescription}>
          <CloseIcon color='teal' fontSize="small"></CloseIcon>
        </IconButton>
      </div>
      <Typography variant="heading3" className="color-dark-teal" sx={{textAlign: 'center', lineHeight: 0}}>{item.item}</Typography>
      <div className="justify-content-center d-flex my-2" style={{overflowY: 'auto'}}>
        <div style={{width: '90%'}}>
          <Typography variant="bodyText" className="color-dark-teal mt-2" sx={{textAlign: 'left'}}>Description</Typography>
          <textarea 
            style={{width: '100%', height: '230px'}}
            placeholder='Add a description'
            onChange={(event)=>{setDescription(event.target.value)}}
          >
            {description}
          </textarea>
        </div>
      </div>
      <div className="d-flex justify-content-end mx-5" style={{flexDirection: "row"}}>
        <TealBotton onClick={handleSaveDescription} style={{width: 'auto'}}>Save</TealBotton>
      </div>
    </Box>
  </Modal>
  </>
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
    <div className="border-radius-med px-5 py-4 bg-white mb-4 shadow" >
      <div className="d-flex justify-content-between" onClick={() => {setOpen(!open)}} style={{cursor: 'pointer'}}>
        <div>
          <Typography variant="heading3" className="color-dark-teal">{group.name}</Typography>
        </div>
        <div className="me-2">
          { open ? <KeyboardArrowUpIcon className="color-medium-teal" sx={{justifyContent: 'end'}}/>
            : <KeyboardArrowDownIcon className="color-medium-teal" sx={{justifyContent: 'end'}}/>
          }
        </div>
      </div>
      <FormGroup sx={{display: isOpen(), mt: 3}}>
        { group.items.length === 0 
          ? <Typography variant="bodyText" className="color-medium-teal">Nothing to do here</Typography>
          : (group.items.map((item, i) => {
              return <div className="d-flex justify-content-between">
                <ChecklistItem key={i} item={item}/>
              </div>
            }))
        }
      </FormGroup>
    </div>
  )
}

function ChecklistModal({city, tripId}) {
  const [open, setOpen] = React.useState(false);
  const [checklist, setChecklist] = React.useState([]);
  const [openAddItemModal, setOpenAddItemModal] = React.useState(false);
  const [newItem, setNewItem] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [options, setOptions] = React.useState({});
  const [openNewGroupModal, setOpenNewGroupModal] = React.useState(false);
  const [newGroup, setNewGroup] = React.useState('');
  async function getCityChecklist() {
    const data = await getTripCityById(tripId, city.id);
    setChecklist(data.checklist);
    let groups = {}
    data.checklist.map((c) => {
      groups[c.name] = false;
    })
    setOptions(groups);
  }
  const handleOpen = () => {
    setOpen(true);
    getCityChecklist();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenAddItemModal = () => {
    setOpenAddItemModal(true);
  };
  const handleCloseAddItemModal = () => {
    setOpenAddItemModal(false);
    setNewItem('');
    setDescription('');
  };
  const handleClickAddItemToGroup = (event) => {
    setOptions({
      ...options,
      [event.target.value]: event.target.checked
    })
  }
  const handleAddItem = () => {
    let groups = []
    Object.entries(options).map(([key, value]) => {
      if (value) {
        groups.push(key);
      }
    });
    let checklistTemp = []
    checklist.map((group) => {
      if (groups.includes(group.name)) {
        group.items.push({item: newItem, checked: false, 'description': description})
      }
      checklistTemp.push(group);
    })
    setChecklist(checklistTemp);
    addNewItem(city.id, newItem, groups, description);
    handleCloseAddItemModal();
    // getCityChecklist();
  }
  const handleOpenNewGroupModal = () => {
    setOpenNewGroupModal(true);
  };
  const handleCloseNewGroupModal = () => {
    setNewGroup('');
    setOpenNewGroupModal(false);
  };
  const handleAddGroup = () => {
    addNewGroup(city.id, newGroup);
    setOptions({
      ...options,
      [newGroup]: true
    })
    setChecklist([...checklist, {name: newGroup, items: []}])
    handleCloseNewGroupModal();
  }
  React.useEffect(() => {
    getCityChecklist();
  }, []);
  return (
    <>
    <IconButton sx={{marginLeft: "5px"}} onClick={handleOpen}>
      <CheckBoxIcon sx={{marginLeft: "5px"}} color='teal'></CheckBoxIcon>
    </IconButton>
    <Typography variant='caption' className='color-medium-teal' sx={{cursor: 'pointer'}} onClick={handleOpen}>Checklist</Typography>
    <Modal
      open={open}
      onClose={handleClose}
      scroll='body'
      aria-labelledby="checklist-dialog"
    >
      <Box sx={mainModal}>
        <div style={{display: "flex", justifyContent: "end", flexDirection: "row", alignItems: "center"}}>
          <IconButton onClick={handleClose}>
            <CloseIcon color='teal' fontSize="small"></CloseIcon>
          </IconButton>
        </div>
        <Typography variant="heading1" className="color-dark-teal" sx={{textAlign: 'center', lineHeight: 0}}>Checklist</Typography>
        <div style={{justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
          <Typography variant="heading2" className="color-dark-teal" sx={{textAlign: 'center', lineHeight: 4}}>{city.city_name}, {city.country_name}</Typography>
        </div>
        <div className="border-radius-med mb-4" style={{overflow: 'auto', height: '100%', paddingLeft: '15px', paddingRight: '15px'}}>
          {checklist.map((group, i) => {
            return <ChecklistGroup key={i} group={group}/>
          })}
        </div>
        {/* ADD ITEM MODAL */}
        <div style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
          <IconButton sx={{marginLeft: "5px"}} onClick={handleOpenAddItemModal}>
            <AddCircleIcon sx={{marginLeft: "5px"}} className="color-medium-teal"></AddCircleIcon>
          </IconButton>
          <Typography variant='bodyText' className='color-medium-teal' sx={{cursor: 'pointer'}} onClick={handleOpenAddItemModal}>Add Item</Typography>
        </div>
        <Modal
          open={openAddItemModal}
          onClose={handleCloseAddItemModal}
          scroll='body'
          aria-labelledby="checklist-dialog"
        >
          <Box sx={popUp}>
            <div style={{display: "flex", justifyContent: "start", flexDirection: "row", alignItems: "center"}}>
              <IconButton onClick={handleCloseAddItemModal}>
                <ArrowBackIosIcon color='teal' fontSize="small"></ArrowBackIosIcon>
              </IconButton>
              <Typography variant='bodyText' className='color-medium-teal' sx={{cursor: 'pointer'}} onClick={handleCloseAddItemModal}>Back</Typography>
            </div>
            <Typography variant="heading2" className="color-dark-teal" sx={{textAlign: 'center', lineHeight: 0}}>New Item</Typography>
            <div className="mx-4 mt-4 mb-4 border-radius-med px-5 py-3 align-items-center" style={{width: '90%', border: '1px solid #1B4965'}}>
              <TextField label="I want to do ..." variant="standard" fullWidth value={newItem} onChange={(event) => {setNewItem(event.target.value)}}/>
              <textarea className="mt-4" style={{width: '100%', height: '150px'}} placeholder="Add a description" onChange={(event) => {setDescription(event.target.value)}}>{description}</textarea>
            </div>
            <div className="mx-5 px-5">
              <div className="d-flex justify-content-between">
                <Typography variant="bodyHeading" className="color-dark-teal" sx={{textAlign: 'center'}}>Add To ...</Typography>
                {/* NEW GROUP MODAL*/}
                <div style={{display: "flex", justifyContent: "end", flexDirection: "row", alignItems: "center"}}>
                  <IconButton sx={{marginLeft: "5px"}} onClick={handleOpenNewGroupModal}>
                    <AddCircleIcon sx={{marginLeft: "5px"}} className="color-medium-teal"></AddCircleIcon>
                  </IconButton>
                  <Typography variant='bodyText' className='color-medium-teal' sx={{cursor: 'pointer'}} onClick={handleOpen}>New Group</Typography>
                </div>
                <Modal
                open={openNewGroupModal}
                onClose={handleCloseNewGroupModal}
                scroll='body'
                aria-labelledby="checklist-dialog"
                >
                  <Box sx={popUpNewGroup}>
                    <div style={{display: "flex", justifyContent: "start", flexDirection: "row", alignItems: "center"}}>
                      <IconButton onClick={handleClose}>
                        <ArrowBackIosIcon color='teal' fontSize="small"></ArrowBackIosIcon>
                      </IconButton>
                      <Typography variant='bodyText' className='color-medium-teal' sx={{cursor: 'pointer'}} onClick={handleClose}>Back</Typography>
                    </div>
                    <Typography variant="heading2" className="color-dark-teal" sx={{textAlign: 'center', lineHeight: 0}}>New Group</Typography>
                    <div className="mx-4 my-5 border-radius-med px-5 pb-2" style={{width: '90%', border: '1px solid #1B4965'}}>
                      <TextField label="Group Name" variant="standard" fullWidth value={newGroup} onChange={(event) => {setNewGroup(event.target.value)}}/>
                    </div>
                    <div className="d-flex justify-content-end mx-5" style={{flexDirection: "row"}}>
                      <TealBotton onClick={handleAddGroup} style={{width: 'auto'}}>Create New Group</TealBotton>
                    </div>
                  </Box>
                </Modal>
                {/* END OF NEW GROUP MODAL*/}
              </div>
              <div style={{my: 2, justifyContent: 'start', display: 'flex', m: 'auto', height: '150px', width: '100%', overflow: 'auto'}}>
                <FormGroup style={{mt: 3, justifyContent: 'center', display: 'block', m: 'auto'}}>
                  {Object.entries(options).map(([key, value]) => {
                    return <FormControlLabel
                      sx={{display: 'block'}}
                      label={key}
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon className="color-medium-teal"/>}
                          checkedIcon={<CheckBoxIcon className="color-medium-teal"/>}
                          value={key}
                          checked={value}
                          onChange={handleClickAddItemToGroup}
                        />
                      }
                    />
                  })}
                </FormGroup>
              </div>
            </div>
            <div className="d-flex justify-content-end mx-5 mt-3" style={{flexDirection: "row"}}>
              <TealBotton onClick={handleAddItem} style={{width: '120px'}}>Add Item</TealBotton>
            </div>
          </Box>
        </Modal>
         {/* END OF ADD ITEM MODAL */}
        <div style={{display: "flex", justifyContent: "end", flexDirection: "row", alignItems: "center"}}>
          <TealBotton onClick={handleClose} style={{width: '95px'}}>Done</TealBotton>
        </div>
      </Box>
    </Modal>
    </>
  )
}

export default ChecklistModal