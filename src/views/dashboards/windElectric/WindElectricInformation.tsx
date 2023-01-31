// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Service Imports
import FactoryService from 'src/services/factory'

// ** Types Imports
import { FactoryUserManagement } from 'src/types/apps/factoryTypes'

// ** Other Imports
import WindElectricForcasting from 'src/views/dashboards/windElectric/WindElectricForcasting'
import WindElectricWindFarm from 'src/views/dashboards/windElectric/WindElectricWindFarm'
import WindElectricTurbin from 'src/views/dashboards/windElectric/WindElectricTurbin'
import WindElectricUser from 'src/views/dashboards/windElectric/WindElectricUser'

const DEFAULT_VALUE: FactoryUserManagement = {
  total_power_forecasting: 0,
  total_wind_farm: 0,
  total_turbine: 0,
  number_user: 0
}

const WindElectricInformation = () => {
  const [factoryUserManagement, setFactoryUserManagement] = useState<FactoryUserManagement>(DEFAULT_VALUE)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await FactoryService.userManagement()
        setFactoryUserManagement(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={3}>
        <WindElectricForcasting factoryUserManagement={factoryUserManagement} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <WindElectricWindFarm factoryUserManagement={factoryUserManagement} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <WindElectricTurbin factoryUserManagement={factoryUserManagement} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <WindElectricUser factoryUserManagement={factoryUserManagement} />
      </Grid>
    </Grid>
  )
}

export default WindElectricInformation
