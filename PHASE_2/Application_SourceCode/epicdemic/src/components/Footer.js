import Typography from '@mui/material/Typography';
import { Box, Link } from "@material-ui/core";

function Footer () {
  return (
    <Box className="bg-dark-teal" sx={{color: 'white', padding: '50px'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '30px' }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column'
          }}>
          <Typography variant="heading3">Navigation</Typography>
          <Link href="/" color="inherit">Home</Link>
          <Link href="/finder" color="inherit">Destination Finder</Link>
          <Link href="/saved" color="inherit">Saved Locations</Link>
        </Box>
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column'
          }}> 
          <Typography variant="heading3" sx={{display: 'block'}}>Resources</Typography>
          <Link href="https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search" color="inherit">Amadeus Flight Offers Search API</Link>
          <Link href="https://developers.amadeus.com/self-service/category/covid-19-and-travel-safety/api-doc/safe-place" color="inherit">Amadeus Safe Place API</Link>
          <Link href="https://developers.amadeus.com/self-service/category/covid-19-and-travel-safety/api-doc/travel-restrictions" color="inherit">Amadeus Travel Restrictions API</Link>
          <Link href="https://covidcontrols.co/" color="inherit">Covid Controls API</Link>
          <Link href="https://promedmail.org/" color="inherit">ProMed</Link>
        </Box>
      </Box>
      <Typography variant="body">ⓒ Epicdemic</Typography>
    </Box>
  )
}

export default Footer