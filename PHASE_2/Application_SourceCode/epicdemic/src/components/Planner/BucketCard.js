import { Button } from "@mui/material";
import { Typography } from "@mui/material";

function BucketCard() {
  return(
    <div className="border-radius-med flex-column m-2 col-3" style={{width: 'auto'}}>
      <div>
        <img src={`https://media.timeout.com/images/105189172/image.jpg`} width="100%"></img>
      </div>
      <div className="bg-light-grey d-flex flex-column p-3 text-start">
        <Typography variant="bodyImportant" className="color-medium-teal ms-2">Skip-the-line tickets to the Prado Museum</Typography>
        <div className="d-flex flex-row justify-content-between mt-1">
          <Button>BOOK</Button>
          <Button>REMOVE</Button>
        </div>
      </div>
    </div>
  )
}

export default BucketCard