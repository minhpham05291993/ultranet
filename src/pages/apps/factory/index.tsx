// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Views Imports
import WindElectricInformation from 'src/views/dashboards/windElectric/WindElectricInformation'
import FactoryListTable from 'src/views/apps/factory/FactoryListTable'

const Factory = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <WindElectricInformation />
      </Grid>
      <Grid item xs={12}>
        <FactoryListTable />
      </Grid>
    </Grid>
  )
}

export default Factory
