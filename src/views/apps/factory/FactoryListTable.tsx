// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import InfoIcon from '@mui/icons-material/Info'

// ** Service Imports
import FactoryService from 'src/services/factory'

// ** Types Imports
import { Factory } from 'src/types/apps/factoryTypes'

// ** Next Import
import { useRouter } from 'next/router'

// ** Components Imports
import CreateFactoryDialog from './CreateFactoryDialog'
import UpdateFactoryDialog from './UpdateFactoryDialog'
import DeleteFactoryDialog from './DeleteFactoryDialog'

const FactoryListTable = () => {
  // ** Hooks
  const router = useRouter()

  const [listFactory, setListFactory] = useState<Factory[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await FactoryService.list()
        const mappedRes: Factory[] = res.factories
        setListFactory(mappedRes)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const columns = [
    {
      field: 'code',
      headerName: 'Code',
      minWidth: 150
    },
    {
      field: 'name',
      headerName: 'name',
      flex: 1
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
      field: 'manager',
      headerName: 'manager',
      minWidth: 150
    },
    {
      field: 'power',
      headerName: 'power',
      type: 'number',
      minWidth: 150
    },
    {
      field: 'status',
      headerName: 'status',
      minWidth: 150
    },
    {
      field: 'number_turbine',
      headerName: 'Turbine number',
      type: 'number',
      minWidth: 150
    },
    {
      field: 'action',
      minWidth: 150,
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <Tooltip title='View detail'>
              <IconButton color='primary' onClick={() => handleClickDetail(params)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <UpdateFactoryDialog factory={params.row} onUpdate={() => getListFactories()} />
            <DeleteFactoryDialog factory={params.row} onDelete={() => getListFactories()} />
          </>
        )
      }
    }
  ]

  const handleClickDetail = (params: any) => {
    router.push(`/apps/factory/${params.row.id}`)
  }

  const getListFactories = async () => {
    try {
      const resList = await FactoryService.list()
      const mappedRes: Factory[] = resList.factories
      setListFactory(mappedRes)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title='List Factories' />
      <Box sx={{ height: 500, position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: 0, zIndex: 1 }}>
          <CreateFactoryDialog onCreate={() => getListFactories()} />
        </Box>
        <DataGrid columns={columns} rows={listFactory} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Card>
  )
}

export default FactoryListTable
