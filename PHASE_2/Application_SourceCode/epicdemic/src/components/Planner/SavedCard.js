import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Col, Row } from 'react-bootstrap';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteTrip } from './tripApiCalls';
import { useNavigate } from 'react-router';

const cardStyle = {
  marginTop: "25px",
  flex: "1 1 0",
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  backgroundColor: "white",
  border: (theme) => `1px solid ${theme.palette.divider}`,
  '& hr': {
    mx: 2,
  },
  '& svg': {
    m: 1.5,
  },
};

function SavedCard({name, start, end, travellers, tripId, update}) {
  const [dateStr, setDateStr] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const date1 = new Date(start);
    const date2 = new Date(end);
    setDateStr(date1.getDate() + '/' + (date1.getMonth() + 1) + '/' + date1.getFullYear() + " - " + date2.getDate() + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear())
  }, []);

  const removeTrip = () => {
    deleteTrip(tripId)
    update()
  }

  const goToTrip = () => {
    navigate(`/trip/${tripId}`)
  }
  const navigate = useNavigate()

  const handleClickSave = (event) => {
    setSaved(event.target.checked);
  }

  return(
    <Box className="shadow" style={cardStyle} sx={{width: "100%"}}>
      <Row className='align-items-center'>
        <Col md={4} onClick={goToTrip}>
          <Typography variant="bodyImportant" className='color-medium-teal me-5'>{name}</Typography>
        </Col>
        <Col md={3}>
          <Row className='align-items-center'>
            <Col md={2}>
              <DateRangeIcon color='teal'></DateRangeIcon>
            </Col>
            <Col>
              <Typography variant="bodyText" className='color-medium-teal'>{dateStr}</Typography>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <Row className='align-items-center'>
            <Col md={2}>
              <PeopleOutlineIcon color='teal'></PeopleOutlineIcon>
            </Col>
            <Col>
              <Typography variant="bodyText" className='color-medium-teal'>{travellers} Travellers</Typography>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <Row className='align-items-center'>
            <Col>
              <IconButton onClick={goToTrip} className='me-4'>
                <EditIcon color='teal'></EditIcon>
              </IconButton>
            </Col>
            <Col>
              <IconButton onClick={removeTrip}>
                <DeleteOutlineIcon color='teal'></DeleteOutlineIcon>
              </IconButton>
            </Col>
          </Row>
        </Col>
        <Col md={1}>
        <Checkbox sx={{display:'block', mx: 'auto' }} checked={saved} icon={<FavoriteBorder fontSize="medium" className="color-small-teal"/>} checkedIcon={<Favorite fontSize="medium" className="color-medium-teal"/>} onClick={handleClickSave} />
        </Col>
      </Row>
      {/* <Divider orientation="vertical" flexItem  variant="middle" flex></Divider> */}
    </Box>
  )
}

export default SavedCard
