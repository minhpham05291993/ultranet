// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Service Imports
import FactoryService from 'src/services/factory'

// ** Types Imports
import { FactoryInformation } from 'src/types/apps/factoryTypes'

// ** Other Imports
import FactoryDetailForcasting from 'src/views/apps/factory/FactoryDetailForcasting'
import FactoryDetailTurbin from 'src/views/apps/factory/FactoryDetailTurbin'
import FactoryDetailUser from 'src/views/apps/factory/FactoryDetailUser'

const DEFAULT_VALUE: FactoryInformation = {
  total_power_forecasting: 0,
  total_turbine: 0,
  number_user: 0
}

const FactoryDetailInformation = () => {
  // ** Hooks
  const router = useRouter()

  const { factoryId } = router.query

  const [factoryInformation, setFactoryInformation] = useState<FactoryInformation>(DEFAULT_VALUE)

  useEffect(() => {
    if (!factoryId) return
    ;(async () => {
      try {
        const res = await FactoryService.information(Number(factoryId))
        setFactoryInformation(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [factoryId])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={4}>
        <FactoryDetailForcasting factoryInformation={factoryInformation} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FactoryDetailTurbin factoryInformation={factoryInformation} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FactoryDetailUser factoryInformation={factoryInformation} />
      </Grid>
    </Grid>
  )
}

export default FactoryDetailInformation
