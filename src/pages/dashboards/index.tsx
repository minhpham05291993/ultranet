// ** MUI Imports
import Grid from '@mui/material/Grid'
import UltranetButton from 'src/views/dashboards/ultranet/UltranetButton'

const Buttons = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <UltranetButton />
      </Grid>
    </Grid>
  )
}

export default Buttons
