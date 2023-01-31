// ** React Imports
import * as React from 'react'

// ** Styled Component Import
import FlexLayoutWrapper from 'src/@core/styles/libs/react-flexlayout'
import RechartsWrapper from 'src/@core/styles/libs/recharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Views Imports
import WindElectricDashboard from 'src/views/dashboards/windElectric/WindElectricDashboard'

const DashBoard = () => {
  return (
    <FlexLayoutWrapper sx={{ height: '100%' }}>
      <RechartsWrapper sx={{ height: '100%' }}>
        <DatePickerWrapper sx={{ height: '100%' }}>
          <WindElectricDashboard />
        </DatePickerWrapper>
      </RechartsWrapper>
    </FlexLayoutWrapper>
  )
}

export default DashBoard
