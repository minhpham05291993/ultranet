import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'

// ** Service Imports
import UserService from 'src/services/user'

// ** Types Imports
import { UserType } from 'src/types/apps/userTypes'

// ** Components Imports
import CreateUserDialog from './CreateUserDialog'
import UpdateUserDialog from './UpdateUserDialog'
import DeleteUserDialog from './DeleteUserDialog'

export default function UserTable() {
  const [listUser, setListUser] = useState<UserType[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await UserService.list()
        const mappedRes: UserType[] = res.users
        setListUser(mappedRes)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const getListUser = async () => {
    try {
      const resList = await UserService.list()
      const mappedRes: UserType[] = resList.users
      setListUser(mappedRes)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      flex: 0.05,
      field: 'id',
      minWidth: 80,
      headerName: 'ID'
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: 'email',
      headerName: 'Email'
    },
    {
      flex: 0.1,
      minWidth: 130,
      field: 'number',
      headerName: 'number'
    },
    {
      flex: 0.1,
      minWidth: 130,
      field: 'role',
      headerName: 'role'
    },
    {
      flex: 0.1,
      field: 'info',
      minWidth: 80,
      headerName: 'info'
    },
    {
      flex: 0.1,
      field: 'action',
      minWidth: 80,
      editable: true,
      headerName: 'action',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <UpdateUserDialog user={params.row} onUpdate={() => getListUser()} />
            <DeleteUserDialog user={params.row} onDelete={() => getListUser()} />
          </>
        )
      }
    }
  ]

  return (
    <Card>
      <CardHeader title='List Users' />
      <Box sx={{ height: 500, position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: 0, zIndex: 1 }}>
          <CreateUserDialog onCreate={() => getListUser()} />
        </Box>
        <DataGrid columns={columns} rows={listUser} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Card>
  )
}
