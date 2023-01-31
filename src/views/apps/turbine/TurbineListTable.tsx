// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'

// ** Next Import
import { useRouter } from 'next/router'

// ** Service Imports
import TurbineService from 'src/services/turbine'

// ** Types Imports
import { Turbine } from 'src/types/apps/turbineTypes'

// ** Components Imports
import CreateTurbineDialog from './CreateTurbineDialog'
import UpdateTurbineDialog from './UpdateTurbineDialog'
import DeleteTurbineDialog from './DeleteTurbineDialog'

const FactoryDetailTable = () => {
  // ** Hooks
  const router = useRouter()

  const { factoryId } = router.query

  const [listTurbine, setListTurbine] = useState<Turbine[]>([])

  const columns = [
    {
      field: 'company',
      headerName: 'company',
      flex: 1
    },
    {
      field: 'model',
      minWidth: 150,
      headerName: 'model'
    },
    {
      field: 'power',
      minWidth: 150,
      headerName: 'Power ???'
    },
    {
      field: 'radius_blade',
      minWidth: 150,
      headerName: 'Radius',
      type: 'number'
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div>
            {params.value?.longitude} - {params.value?.latitude}
          </div>
        )
      }
    },
    {
      field: 'height',
      minWidth: 150,
      headerName: 'Heihgt ???'
    },
    {
      field: 'action',
      minWidth: 150,
      headerName: 'action',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <UpdateTurbineDialog turbine={params.row} onUpdate={() => getListTurbines()} />
            <DeleteTurbineDialog turbine={params.row} onDelete={() => getListTurbines()} />
          </>
        )
      }
    }
  ]

  const getListTurbines = async () => {
    try {
      const res = await TurbineService.list(Number(factoryId))
      const mappedRes: Turbine[] = res.turbines
      setListTurbine(mappedRes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log('factoryId', factoryId)
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
    <Card>
      <Box sx={{ height: 500, position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: 0, zIndex: 1 }}>
          <CreateTurbineDialog onCreate={() => getListTurbines()} />
        </Box>
        <DataGrid columns={columns} rows={listTurbine} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Card>
  )
}

export default FactoryDetailTable
