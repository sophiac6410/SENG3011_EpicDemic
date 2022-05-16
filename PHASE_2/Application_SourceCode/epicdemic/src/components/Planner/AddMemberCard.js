/// FOR ADD MEMBER MODAL ///
import {Typography, IconButton, Input, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import {Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import { Navigate, useNavigate } from 'react-router-dom';
import { TealBotton } from '../../styles/Button';
import CloseIcon from '@mui/icons-material/Close';
import { addMember, removeMember, getMembers, getTripOwner, getDestinationPhotos } from '../../adapters/tripAPI';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const shareMemberStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "1000px",
  bgcolor: 'background.paper',
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  backgroundColor: "#EEF0F2",
  display: "flex",
  flexDirection: "column",
};

function RestrictBox({name, email, owner, trigger, setTrigger, id, type}){
  const darkTeal = '#1B4965';
  const [memberType, setMemberType] = useState(type)
  const remove_member = async () => {
    console.log(email)
    const data = await removeMember(email, id);
    console.log(data)
    setTrigger(trigger + 1)
  }

	return (
		<Row className="mt-2 mb-3 py-3 px-4 border-radius-small" style={{backgroundColor: 'white', boxShadow: '0px 1px 5px #CCCCCC', marginLeft: '80px', marginRight: '80px' }}>
			<Box sx={{ display: 'flex' }}>
				<Typography variant="heading3" sx={{color: darkTeal, flex: 1, justifyContent: 'flex-start', textAlign: 'left' }}> {name} </Typography>	
        {
          owner ? <Typography variant="heading4" sx={{color: darkTeal, flex: 1, justifyContent: 'flex-end', textAlign: 'right'}}> Owner </Typography>
          : <FormControl size="small" sx={{m: 0, p: 0}}>
              <Select
                label="."
                value={memberType}
                onChange={(event)=>{setMemberType(event.target.value)}}
              >
                <MenuItem value={'Viewer'}>Viewer</MenuItem>
                <MenuItem value={'Editor'}>Editor</MenuItem>
              </Select>
            </FormControl>
        }
			</Box>
			<Box sx={{ display: 'flex'}}>
				<Typography variant="caption" sx={{color: darkTeal, flex: 1, justifyContent: 'flex-start', textAlign: 'left' }}>{email}</Typography>
        {
          owner ? <></>
          : <Typography variant="caption" sx={{color: darkTeal, flex: 1, justifyContent: 'flex-end', textAlign: 'right', textDecoration: 'underline', cursor: 'pointer'}}
              onClick={remove_member}
            > Remove </Typography>
        }
			</Box>
		</Row>
	);
}

function AddMemberCard({isOpen, onClose , tripId}) {
  const teal = "#0F83A0";
  const [email, setEmail] = useState('')
  const [owner, setOwner] = useState({})
  const [members, setMembers] = useState([])
  const [trigger, setTrigger] = useState(0)
  const [memberType, setMemberType] = useState('Viewer')
  const add_member = async () => {
    console.log(email)
    const data = await addMember(email, tripId, memberType);
    console.log(data)
    setEmail('')
    setTrigger(trigger + 1)
  }

  useEffect(() => {
    async function getOwner() {
      const data = await getTripOwner(tripId)
      if(data !== undefined) {
        setOwner(data)
        console.log('owner', data);
      }
    }
    async function updateMembers() {
      const data = await getMembers(tripId)
      if(data != undefined) {
        setMembers(data)
        console.log('members', data)
      }
    }
    getOwner()
    updateMembers()
  }, [trigger])

  return(
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={shareMemberStyle}>
        <div style={{display: "flex", justifyContent: "end", flexDirection: "row", alignItems: "center"}}>
          <IconButton onClick={onClose}>
            <CloseIcon color='teal' fontSize="small"></CloseIcon>
          </IconButton>
        </div>
        <Typography variant="heading2" className='color-dark-teal'>
          Share your trip with other users
        </Typography>
        <Box className="justify-content-between" sx={{ display: 'flex', marginLeft: '80px', marginRight: '80px' }}>
          <div className="border-radius-med bg-white px-5 mt-2 justify-content-between align-items-center d-flex" style={{width: '85%', height: '65px'}}>
            <Input type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter an email" value={email} style={{border: 'none', width: '80%', margin: 0}}/>
            <FormControl size="small" sx={{m: 0, p: 0}}>
              <Select
                label="."
                value={memberType}
                displayEmpty
                onChange={(event)=>{setMemberType(event.target.value)}}
              >
                <MenuItem value={'Viewer'}>Viewer</MenuItem>
                <MenuItem value={'Editor'}>Editor</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TealBotton onClick={add_member} sx={{marginTop: '20px', marginBottom: '20px'}}> Share </TealBotton>
        </Box>

        <div className="mt-2" style={{overflow: 'auto', height: '300px'}}>
          <RestrictBox
            email={owner.email}
            name={owner.name}
            owner={true}
            trigger={trigger}
            setTrigger={setTrigger}
            id={tripId}
          />
          { members.map((mem, idx) => {
            console.log(mem)
            return (
              <RestrictBox
                key={idx}
                email={mem.email}
                name={mem.name}
                type={mem.type}
                owner={false}
                trigger={trigger}
                setTrigger={setTrigger}
                id={tripId}
              />  
            )
          })}
        </div>

        <Box sx={{display: "flex", flexDirection: "row", marginTop: "30px", justifyContent: 'center'}}>
          <Col md={6}>
            <TealBotton onClick={onClose}>Done</TealBotton>
          </Col>
        </Box>
      </Box>
    </Modal>
  )
}


export default AddMemberCard