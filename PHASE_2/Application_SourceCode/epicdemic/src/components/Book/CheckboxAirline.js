import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckboxAirline(airline) {
  return (
    <FormGroup style={{
      display: 'block',
      height: '200px',
      overflowY:'scroll'
    }}>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked />} label='AirAsia'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked />} label='Cathay Pacific'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked />} label='Jetstar'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked />} label='Korean Air'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked />} label='Malaysia Airlines'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked />} label='Philippine Airlines'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked />} label='Qantas Airways'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked />} label='Singapore Airlines'/>
      <FormControlLabel sx={{display: 'block'}} control={<Checkbox defaultChecked />} label='Virgin Australia'/>
    </FormGroup>
  );
}