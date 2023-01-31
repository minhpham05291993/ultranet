// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import UpdateIcon from '@mui/icons-material/Update'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Components Imports
import FormCreateUser from './FormCreateUser'

// ** Types Imports
import { UserType } from 'src/types/apps/userTypes'

// ** Service Imports
import UserService from 'src/services/user'

interface Props {
  user: UserType
  onUpdate: () => void
}

function UpdateFactoryDialog({ user, onUpdate }: Props) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const hanldeUpdate = async (data: UserType) => {
    try {
      console.log('update')
      const res = await UserService.update(data)
      if (res.Ok) {
        onUpdate()
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
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
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DatePickerWrapper>
            <Grid container spacing={6}>
              <Grid item xs={12} md={12}>
                <FormCreateUser user={user} onUpdate={hanldeUpdate} onCancel={handleClose} />
              </Grid>
            </Grid>
          </DatePickerWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UpdateFactoryDialog
