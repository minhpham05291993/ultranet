// ** React Imports
import React, { useState } from 'react'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

const anchor: Anchor = 'right'

const Drawer = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
  width: 400,
  zIndex: theme.zIndex.modal,
  '& .MuiFormControlLabel-root': {
    marginRight: '0.6875rem'
  },
  '& .MuiDrawer-paper': {
    border: 0,
    width: 400,
    zIndex: theme.zIndex.modal,
    boxShadow: theme.shadows[9]
  }
}))

interface Props {
  onChangeLayout: () => void
}

const CustomFlexLayoutSetting = ({ onChangeLayout }: Props) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <IconButton
        size='small'
        onClick={() => setOpen(true)}
        color='primary'
        aria-label='add to layout'
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: 1
        }}
      >
        <SettingsIcon />
      </IconButton>
      <Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(3.5, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            Layout settings
          </Typography>

          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              right: 20,
              top: '50%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          <Box sx={{ mx: 4, my: 4 }}>
            <Button size='small' onClick={onChangeLayout}>
              Reset layout
            </Button>
          </Box>
        </PerfectScrollbar>
      </Drawer>
    </>
  )
}

export default CustomFlexLayoutSetting
