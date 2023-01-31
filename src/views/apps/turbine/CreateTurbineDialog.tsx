// ** React Imports
import { useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { useSnackbar } from 'notistack'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icons Imports
import AddIcon from '@mui/icons-material/Add'

// ** Components Imports
import FormCreateUpdateTurbine from './FormCreateUpdateTurbine'

// ** Types Imports
import { Turbine } from 'src/types/apps/turbineTypes'

// ** Service Imports
import TurbineService from 'src/services/turbine'

interface Props {
  onCreate: () => void
}

const CreateTurbineDialog = ({ onCreate }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { factoryId } = router.query
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = async (data: Turbine) => {
    try {
      console.log('create', data)
      const res = await TurbineService.create({ ...data, factory_id: Number(factoryId) })
      enqueueSnackbar('Create success', { variant: 'success' })
      if (res.Ok) {
        onCreate()
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Create error', { variant: 'error' })
    }
  }

  return (
    <>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClickOpen}>
        Create turbine
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DatePickerWrapper>
            <Grid container spacing={6}>
              <Grid item xs={12} md={12}>
                <FormCreateUpdateTurbine onCreate={handleCreate} onCancel={handleClose} />
              </Grid>
            </Grid>
          </DatePickerWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateTurbineDialog
