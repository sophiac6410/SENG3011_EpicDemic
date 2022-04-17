import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { TealBotton } from "../../styles/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';

function ActivityCard() {
  return(
    <div className="border-radius-med flex-column m-2 col-3 bg-light-blue" style={{width: 'auto'}}>
      <div>
        <img src={`https://media.timeout.com/images/105189172/image.jpg`} width="100%"></img>
      </div>
      <div className="bg-light-grey d-flex flex-column p-3 text-start">
        <Typography variant="bodyImportant" className="color-medium-teal ms-2">Skip-the-line tickets to the Prado Museum</Typography>
        <div className="d-flex flex-row justify-content-between mt-1 align-items-center">
          <div className="d-flex flex-row ms-2 align-items-center">
            <Typography variant="bodyText" className="color-dark-teal me-3" sx={{fontWeight: 700}}>Rating</Typography>
            <StarIcon color="darkTeal" fontSize="15px"></StarIcon>
            <StarIcon color="darkTeal" fontSize="15px"></StarIcon>
            <StarIcon color="darkTeal" fontSize="15px"></StarIcon>
          </div>
          <Typography variant="bodyText" className="color-dark-teal" sx={{fontWeight: 700}}>$14 EUR</Typography>
        </div>
        <Typography variant="bodyText" className="color-dark-grey ms-2 mt-2">Book your tickets for the Prado Museum in Madrid, discover masterpieces by Velázquez, Goya, Mantegna, Raphael, Tintoretto and access all temporary exhibitions.</Typography>
        <div className="d-flex flex-row justify-content-between mt-1">
          {/* <Button color="darkTeal">BOOK</Button>
          <Button color="darkTeal">REMOVE</Button> */}
          <TealBotton className="mt-4 mb-4 ms-2">Book</TealBotton>
          <IconButton className="d-flex flex-column">
            <FavoriteIcon color="teal"></FavoriteIcon>
            <Typography variant="bodySmall" className="color-medium-teal">Save to bucketlist</Typography>
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard