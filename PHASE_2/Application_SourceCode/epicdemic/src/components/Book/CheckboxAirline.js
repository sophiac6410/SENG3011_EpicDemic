import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckboxAirline(airline) {
  return (
    <FormGroup style={{
      display: 'block',
      height: '200px',
      width: 'auto',
      overflowY:'scroll',
    }}>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked size="small"/>} label='AirAsia'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked size="small"/>} label='Cathay Pacific'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked size="small"/>} label='Jetstar'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked size="small"/>} label='Korean Air'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked size="small"/>} label='Malaysia Airlines'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked size="small"/>} label='Philippine Airlines'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked size="small"/>} label='Qantas Airways'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked size="small"/>} label='Singapore Airlines'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked size="small"/>} label='Virgin Australia'/>
    </FormGroup>
  );
}