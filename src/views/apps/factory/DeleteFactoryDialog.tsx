// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { useSnackbar } from 'notistack'

// ** Types Imports
import { Factory } from 'src/types/apps/factoryTypes'

// ** Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'

// ** Service Imports
import FactoryService from 'src/services/factory'

interface Props {
  factory: Factory
  onDelete: () => void
}

function DeleteFactoryDialog({ onDelete, factory }: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    try {
      console.log('delete')
      const res = await FactoryService.delete(factory.id)
      enqueueSnackbar('Delete success', { variant: 'success' })

      if (res.Ok) {
        onDelete()
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Delete error', { variant: 'error' })
    }
  }

  return (
    <>
      <Tooltip title='Delete'>
        <IconButton color='primary' onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete Factory'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{'Are you sure to delete this factory?'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteFactoryDialog
