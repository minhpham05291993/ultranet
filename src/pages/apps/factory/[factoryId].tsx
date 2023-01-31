// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Views Imports
import FactoryDetailInformation from 'src/views/apps/factory/FactoryDetailInformation'
import TurbineListTable from 'src/views/apps/turbine/TurbineListTable'
import FactoryDetailChart from 'src/views/apps/factory/FactoryDetailChart'
import ListTurbineChart from 'src/views/apps/turbine/ListTurbineChart'

const Factory = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FactoryDetailInformation />
      </Grid>
      <Grid item xs={12}>
        <TurbineListTable />
      </Grid>
      <Grid item xs={12}>
        <FactoryDetailChart />
      </Grid>
      <Grid item xs={12}>
        <ListTurbineChart />
      </Grid>
    </Grid>
  )
}

export default Factory
