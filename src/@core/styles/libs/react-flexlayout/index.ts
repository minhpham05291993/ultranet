// ** MUI imports
import { styled } from '@mui/material/styles'

const FlexLayoutWrapper = styled('div')(({ theme }) => ({
  '& .flexlayout__tabset_tabbar_outer': {
    background: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.customColors.bodyBg
  },
  '& .flexlayout__border_inner_tab_container': {
    background: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.customColors.bodyBg
  },
  '& .flexlayout__splitter': {
    // background: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.customColors.bodyBg
    background: '#a7b6c2'
  },
  '& .flexlayout__tab': {
    background: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.customColors.bodyBg
  },
  '& .flexlayout__border': {
    background: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.customColors.bodyBg
  },
  '& .flexlayout__tab_button': {
    background: 'transparent'
  }
}))

export default FlexLayoutWrapper
