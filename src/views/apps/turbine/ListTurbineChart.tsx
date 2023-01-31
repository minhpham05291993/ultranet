// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Service Imports
import TurbineService from 'src/services/turbine'

// ** Components Imports
import TurbineChart from 'src/views/apps/turbine/TurbineChart'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types Imports
import { Turbine } from 'src/types/apps/turbineTypes'

const ListTurbineChart = () => {
  // ** Hooks
  const router = useRouter()

  const { factoryId } = router.query

  const [listTurbine, setListTurbine] = useState<Turbine[]>([])

  useEffect(() => {
    if (!factoryId) return
    ;(async () => {
      try {
        const res = await TurbineService.list(Number(factoryId))
        const mappedRes: Turbine[] = res.turbines
        setListTurbine(mappedRes)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [factoryId])

  return (
    <Grid container spacing={6}>
      {listTurbine.map(turbine => {
        return (
          <Grid key={turbine.factory_id} item xs={12} sm={6} md={4}>
            <TurbineChart turbine={turbine} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ListTurbineChart
