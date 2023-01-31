// ** React Imports
import * as React from 'react'

// ** Flexlayout Imports
import { IJsonModel } from 'flexlayout-react'

// ** Next Imports
import dynamic from 'next/dynamic'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Other Imports
import { v4 as uuidv4 } from 'uuid'
import FactoryDetailChart from 'src/views/apps/factory/FactoryDetailChart'
import FactoryDetailTable from 'src/views/apps/factory/FactoryDetailTable'

const CustomFlexLayout = dynamic(() => import('src/@core/components/custom-flexlayout'), {
  //   loading: () => 'Loading...'
  ssr: false
})

const defaultJson: IJsonModel = {
  global: {
    tabEnableFloat: true,
    tabSetMinWidth: 100,
    tabSetMinHeight: 100,
    borderMinSize: 100
  },
  layout: {
    type: 'row',
    id: '#rowId',
    children: [
      {
        type: 'tabset',
        id: '#tabsetid',
        weight: 12.5,
        children: [
          {
            type: 'tab',
            id: uuidv4(),
            name: 'FactoryTable',
            component: 'FactoryTable',
            enableClose: false
          }
        ],
        active: true
      },
      {
        type: 'tabset',
        id: '#tabsetid2',
        weight: 12.5,
        children: [
          {
            type: 'tab',
            id: uuidv4(),
            name: 'FactoryChart',
            component: 'FactoryChart'
          }
        ],
        active: true
      }
    ]
  }
}

const WindElectricDashboard = () => {
  return (
    <Box
      sx={{
        height: '100%'
      }}
    >
      <CustomFlexLayout
        layoutName='flexLayoutModel_Work'
        defaultJson={defaultJson}
        componentObj={{
          FactoryChart: <FactoryDetailChart />,
          FactoryTable: <FactoryDetailTable />
        }}
      />
    </Box>
  )
}

export default WindElectricDashboard
