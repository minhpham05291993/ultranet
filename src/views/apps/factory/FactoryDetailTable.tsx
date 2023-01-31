// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Service Imports
import FactoryService from 'src/services/factory'

// ** Types Imports
import { Factory, FactoryForecast } from 'src/types/apps/factoryTypes'
import { Period } from 'src/types/apps/chartTypes'

const LIST_PERIOD = [
  {
    value: '1h',
    label: '1h'
  },
  {
    value: '1d',
    label: '1d'
  }
]

const FactoryTable = () => {
  // ** Hooks

  const [period, setPeriod] = useState<Period>('1d')
  const [resolution, setResolution] = useState<string>('auto')

  const [forecastData, setForecastData] = useState<FactoryForecast[]>([])
  const [listFactory, setListFactory] = useState<Factory[]>([])
  const [selectedFactory, setSelectedFactory] = useState<string>('')

  const handleChangePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as Period)
  }

  const handleChangeFactory = (event: SelectChangeEvent) => {
    setSelectedFactory(event.target.value as string)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await FactoryService.list()
        setListFactory(res.factories)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (!selectedFactory) return
    ;(async () => {
      try {
        const res = await FactoryService.forecast({
          factoriesId: [Number(selectedFactory)],
          period
        })
        const newForecastData = res[selectedFactory].map(i => {
          return {
            id: i.timestamp,
            capacity: i.capacity,
            timestamp: i.timestamp
          }
        })
        setForecastData(newForecastData)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [selectedFactory, period])

  const columns = [
    {
      flex: 0.5,
      minWidth: 200,
      editable: true,
      field: 'timestamp',
      headerName: 'timestamp'
    },
    {
      flex: 0.5,
      field: 'capacity',
      minWidth: 80,
      headerName: 'capacity'
    }
  ]

  return (
    <Card>
      <CardContent>
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex' }}>
            <Box>
              <FormControl>
                <InputLabel id='factory-select-label' size='small'>
                  Factory
                </InputLabel>
                <Select
                  size='small'
                  labelId='factory-select-label'
                  id='factory-select'
                  value={selectedFactory}
                  label='Factory'
                  onChange={handleChangeFactory}
                >
                  {listFactory.map((item, index) => {
                    return (
                      <MenuItem value={item.id} key={index}>
                        {item.id} - {item.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box ml={4}>
              <FormControl>
                <InputLabel id='period-select-label' size='small'>
                  Period
                </InputLabel>
                <Select
                  size='small'
                  labelId='period-select-label'
                  id='period-select'
                  value={period}
                  label='period'
                  onChange={handleChangePeriod}
                >
                  {LIST_PERIOD.map((item, index) => {
                    return (
                      <MenuItem value={item.value} key={index}>
                        {item.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box ml={4}>
              <FormControl>
                <InputLabel id='date-select-label' size='small'>
                  Resolution
                </InputLabel>
                <Select
                  size='small'
                  labelId='date-select-label'
                  id='date-select'
                  value={resolution}
                  label='resolution'
                  onChange={() => setResolution('auto')}
                >
                  <MenuItem value={'auto'} key={'auto'}>
                    Auto
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ height: 500, position: 'relative' }}>
            <DataGrid columns={columns} rows={forecastData} components={{ Toolbar: GridToolbar }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FactoryTable
