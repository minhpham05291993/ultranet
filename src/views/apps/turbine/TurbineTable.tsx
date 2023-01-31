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
import TurbineService from 'src/services/turbine'

// ** Types Imports
import { Turbine, TurbineForecast } from 'src/types/apps/turbineTypes'
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

interface Props {
  turbine: Turbine
}

const TurbineTable = ({ turbine }: Props) => {
  // ** Hooks

  const [period, setPeriod] = useState<Period>('1h')
  const [date, setDate] = useState<string>('')
  const [forecastData, setForecastData] = useState<TurbineForecast[]>([])

  const handleChangePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as Period)
  }

  const handleChangeDate = (event: SelectChangeEvent) => {
    setDate(event.target.value as string)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await TurbineService.forecast({
          turbinesId: [Number(turbine.id)],
          period
        })
        const newForecastData = res[turbine.id].map(i => {
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
  }, [turbine, period])

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

  console.log('forecastData', forecastData)

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex' }}>
            <Box>
              <FormControl>
                <InputLabel id='period-select-label' size='small'>
                  Resolution
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
                  Date
                </InputLabel>
                <Select
                  size='small'
                  labelId='date-select-label'
                  id='date-select'
                  value={date}
                  label='date'
                  onChange={handleChangeDate}
                >
                  <MenuItem value={10}>1h ago</MenuItem>
                  <MenuItem value={20}>1d ago</MenuItem>
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

export default TurbineTable
