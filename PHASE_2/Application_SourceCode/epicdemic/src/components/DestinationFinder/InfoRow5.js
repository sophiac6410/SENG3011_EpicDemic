import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "../../styles/DestinationFinder.css";
import BlueDot from "../../static/bluedot.svg"
import { Typography, IconButton } from "@mui/material";
import { useNavigate, } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

const popUpStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40vw",
    minWidth: '300px',
    maxHeight: "80vh",
    bgcolor: 'background.paper',
    borderRadius: "30px",
    boxShadow: 24,
    px: 5,
    pt: 3,
    pb: 5,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  }

const InfoRow5 = ({country, desc, dateTime, code, updateType}) => {
    let navigate = useNavigate(); 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Row className="info-row bg-white" style={{margin: '2% 0%', cursor: 'pointer'}}>
            <Col xs={10} onClick={() => {navigate(`/destination/${code}`)}}>
                <Row>
                    <Col xs={2} className="d-flex">
                        <img
                        loading="lazy"
                        width="50"
                        src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
                        alt=""
                        className="me-3"
                        />
                        <Typography variant="bodyHeading">{country}</Typography>
                    </Col>
                    <Col xs={7}>
                        <Typography variant="bodyImportant">New {updateType === "Others" ? 'conditions and' : updateType} rules</Typography>
                    </Col>
                    <Col xs={2} style={{textAlignLast: 'end'}}>
                        <Typography variant="bodyText" sx={{textAlign: 'center'}}>Updated on</Typography>
                        <Typography variant="bodyText">{dateTime.toDateString()}</Typography>
                    </Col>
                </Row>
            </Col>
            <Col xs={1} className="justify-content-center d-flex">
                <IconButton onClick={handleOpen}>
                    <MoreHorizIcon className="color-dark-teal"/>
                </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    scroll='body'
                    aria-labelledby="checklist-dialog"
                >
                    <Box sx={popUpStyle}>
                    <div style={{display: "flex", justifyContent: "end", flexDirection: "row", alignItems: "center"}}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon color='teal' fontSize="small"></CloseIcon>
                        </IconButton>
                    </div>
                    <Typography variant="bodyHeading" sx={{textAlign: 'center', mb: 2}}>{country}: New {updateType === "Others" ? 'conditions and' : updateType} rules</Typography>
                    <Typography variant="bodyText" sx={{textAlign: 'center'}}>Updated on {dateTime.toDateString()}</Typography>
                    <div className="mt-2" style={{overflowY: 'auto'}}>
                        <Typography variant="bodyText">{desc}</Typography>
                    </div>
                    </Box>
                </Modal>
            </Col>
        </Row>
    );
};

export default InfoRow5;