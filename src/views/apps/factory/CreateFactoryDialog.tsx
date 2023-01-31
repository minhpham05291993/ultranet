// ** React Imports
import { useState } from 'react'

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
import FormCreateUpdateFactory from './FormCreateUpdateFactory'

// ** Types Imports
import { Factory } from 'src/types/apps/factoryTypes'

// ** Service Imports
import FactoryService from 'src/services/factory'

interface Props {
  onCreate: () => void
}

const CreateFactoryDialog = ({ onCreate }: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = async (data: Factory) => {
    try {
      console.log('create', data)
      const res = await FactoryService.create(data)
      enqueueSnackbar('Create success', { variant: 'success' })
      if (res.Ok) {
        onCreate()
        setOpen(false)
      }
    } catch (error) {
      enqueueSnackbar('Create error', { variant: 'error' })
      console.log(error)
    }
  }

  return (
    <>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClickOpen}>
        Create factory
      </Button>

      <Dialog
        open={open}
        maxWidth='lg'
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DatePickerWrapper>
            <Grid container spacing={6}>
              <Grid item xs={12} md={12}>
                <FormCreateUpdateFactory onCreate={handleCreate} onCancel={handleClose} />
              </Grid>
            </Grid>
          </DatePickerWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateFactoryDialog
