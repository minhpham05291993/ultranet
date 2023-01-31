// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useSnackbar } from 'notistack'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Components Imports
import FormCreateUpdateFactory from './FormCreateUpdateFactory'

// ** Types Imports
import { Factory } from 'src/types/apps/factoryTypes'

// ** Icons Imports
import UpdateIcon from '@mui/icons-material/Update'

// ** Service Imports
import FactoryService from 'src/services/factory'

interface Props {
  factory: Factory
  onUpdate: () => void
}

function UpdateFactoryDialog({ factory, onUpdate }: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUpdate = async (data: Factory) => {
    try {
      console.log('update')
      const res = await FactoryService.update(data)
      enqueueSnackbar('Update success', { variant: 'success' })
      if (res.Ok) {
        onUpdate()
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Update error', { variant: 'error' })
    }
  }

  return (
    <>
      <Tooltip title='Update'>
        <IconButton color='primary' onClick={handleClickOpen}>
          <UpdateIcon />
        </IconButton>
      </Tooltip>

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
                <FormCreateUpdateFactory factory={factory} onUpdate={handleUpdate} onCancel={handleClose} />
              </Grid>
            </Grid>
          </DatePickerWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UpdateFactoryDialog
