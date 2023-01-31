// ** React Imports
import { useEffect, useState, useCallback } from 'react'

// ** Next Import
// import dynamic from 'next/dynamic'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Third Party Imports
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipChart,
  ResponsiveContainer,
  TooltipProps
} from 'recharts'

// ** Service Imports
import FactoryService from 'src/services/factory'

// ** Types Imports
import { Factory, FactoryForecast } from 'src/types/apps/factoryTypes'
import { Period } from 'src/types/apps/chartTypes'

// ** Utils Imports
import { keyBy } from 'lodash'
import FileSaver from 'file-saver'
import { useCurrentPng } from 'recharts-to-png'

// ** Icons Imports
import DownloadIcon from '@mui/icons-material/Download'
import PendingIcon from '@mui/icons-material/Pending'

const LIST_PERIOD = [
  {
    value: '1h',
    label: '1h ago'
  },
  {
    value: '1d',
    label: '1d ago'
  }
]

const CustomTooltip = (props: TooltipProps<any, any>) => {
  // ** Props
  const { active, payload } = props

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography sx={{ fontSize: '0.875rem' }}>{`${payload[0].value}%`}</Typography>
      </div>
    )
  }

  return null
}

const FactoryChart = () => {
  // ** Hooks
  const router = useRouter()

  // useCurrentPng usage (isLoading is optional)
  const [getPng, { ref, isLoading }] = useCurrentPng()

  const { factoryId } = router.query
  const { settings } = useSettings()

  const direction = settings?.direction

  const [period, setPeriod] = useState<Period>('1d')
  const [resolution, setResolution] = useState<string>('auto')
  const [forecastData, setForecastData] = useState<FactoryForecast[]>([])
  const [listFactory, setListFactory] = useState<Factory[]>([])
  const [factory, setFactory] = useState<Factory>()

  const handleChangePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as Period)
  }

  const handleChangeFactory = (event: SelectChangeEvent) => {
    const listFactoryObj = keyBy(listFactory, 'id')
    setFactory(listFactoryObj[event.target.value as string])
  }

  const handleDownload = useCallback(async () => {
    const png = await getPng()
    console.log(png)

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, 'myChart.png')
    }
  }, [getPng])

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
    if (!factory) return
    ;(async () => {
      try {
        const res = await FactoryService.forecast({
          factoriesId: [Number(factory.id)],
          period
        })
        const newForecastData = res[factory.id].map(i => {
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
  }, [factory, period])

  useEffect(() => {
    if (!factoryId) return
    ;(async () => {
      try {
        const res = await FactoryService.detail(Number(factoryId))
        const mappedRes: Factory = res.factory
        setFactory(mappedRes)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [factoryId])

  return (
    <Card>
      <CardHeader
        title='Factory Chart'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
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
                  value={String(factory?.id) || undefined}
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
                <InputLabel id='resolution-select-label' size='small'>
                  Resolution
                </InputLabel>
                <Select
                  size='small'
                  labelId='resolution-select-label'
                  id='resolution-select'
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
            <Box ml={4}>
              <Tooltip title='Download'>
                <IconButton color='primary' onClick={handleDownload}>
                  {isLoading ? <PendingIcon /> : <DownloadIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <LineChart height={350} data={forecastData} style={{ direction }} margin={{ left: -20 }} ref={ref}>
              <CartesianGrid />
              <XAxis dataKey='timestamp' reversed={direction === 'rtl'} />
              <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
              <TooltipChart content={CustomTooltip} />
              <Line dataKey='capacity' stroke='#ff9f43' strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FactoryChart
