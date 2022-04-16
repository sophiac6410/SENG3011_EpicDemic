import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Col, Row } from 'react-bootstrap';
import { IconButton } from '@mui/material';

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
  boxShadow: "1px 3px #888888",
  border: (theme) => `1px solid ${theme.palette.divider}`,
  '& hr': {
    mx: 2,
  },
  '& svg': {
    m: 1.5,
  },
};

function SavedCard() {
  return(
    <Box style={cardStyle} sx={{width: "90%"}}>
      <Row className='align-items-center'>
        <Col md={4}>
          <Typography variant="bodyImportant" className='color-medium-teal me-5'>Tiana’s Europe Adventures</Typography>
        </Col>
        <Col md={3}>
          <Row className='align-items-center'>
            <Col md={2}>
              <DateRangeIcon color='teal'></DateRangeIcon>
            </Col>
            <Col>
              <Typography variant="bodyText" className='color-medium-teal'>23/06/22 - 23/08/22</Typography>
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <Row className='align-items-center'>
            <Col md={2}>
              <PeopleOutlineIcon color='teal'></PeopleOutlineIcon>
            </Col>
            <Col>
              <Typography variant="bodyText" className='color-medium-teal'>2 Travellers</Typography>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <Row className='align-items-center'>
            <Col>
              <IconButton className='me-4'>
                <EditIcon color='teal'></EditIcon>
              </IconButton>
            </Col>
            <Col>
              <IconButton>
                <DeleteOutlineIcon color='teal'></DeleteOutlineIcon>
              </IconButton>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <Divider orientation="vertical" flexItem  variant="middle" flex></Divider> */}
    </Box>
  )
}

export default SavedCard
