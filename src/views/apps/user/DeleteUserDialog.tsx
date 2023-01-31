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
import DeleteIcon from '@mui/icons-material/Delete'

import { UserType } from 'src/types/apps/userTypes'

import UserService from 'src/services/user'

interface Props {
  onDelete: () => void
  user: UserType
}

function DeleteUserDialog({ onDelete, user }: Props) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    try {
      const res = await UserService.delete(user.id)
      if (res.Ok) {
        onDelete()
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
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
        <DialogTitle id='alert-dialog-title'>{'Delete User'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{'Are you sure to delete this user?'}</DialogContentText>
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

export default DeleteUserDialog
