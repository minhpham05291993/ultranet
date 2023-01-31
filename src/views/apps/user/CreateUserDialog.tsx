// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icons Imports
import AddIcon from '@mui/icons-material/Add'

// ** Components Imports
import FormCreateUser from './FormCreateUser'

// ** Types Imports
import { UserType } from 'src/types/apps/userTypes'

// ** Service Imports
import UserService from 'src/services/user'

interface Props {
  onCreate: () => void
}

const CreateUserDialog = ({ onCreate }: Props) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = async (data: UserType) => {
    try {
      const res = await UserService.create(data)
      if (res.Ok) {
        onCreate()
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClickOpen}>
        Create User
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
                <FormCreateUser
                  onCreate={handleCreate}
                  onCancel={handleClose} />
              </Grid>
            </Grid>
          </DatePickerWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateUserDialog
