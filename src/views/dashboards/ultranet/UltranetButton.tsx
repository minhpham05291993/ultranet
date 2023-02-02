// ** MUI Imports
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Service Imports
import UserService from 'src/services/user'

import { useState, forwardRef } from 'react'
import DatePicker from 'react-datepicker'

// ** Types Imports
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import format from 'date-fns/format'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { useSnackbar } from 'notistack'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

const UltranetButton = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [dates, setDates] = useState<Date[]>([])
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [startDateRange, setStartDateRange] = useState<DateType>(null)

  const handleCheckin = async () => {
    UserService.checkin()
    try {
      await UserService.checkin()
      enqueueSnackbar('Checkin success', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' })
    }
  }

  const handleCheckout = async () => {
    try {
      await UserService.checkout()
      enqueueSnackbar('Checkout success', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' })
    }
  }

  const handleExport = async () => {
    try {
      if (!startDateRange || !endDateRange) {
        enqueueSnackbar('No start date and end date', { variant: 'error' })
        return
      }
      const start = format(startDateRange as Date, 'yyyy-MM-dd')
      const end = format(endDateRange as Date, 'yyyy-MM-dd')
      const res: any = await UserService.exportExcel({
        start,
        end
      })
      // save data to file
      const blob = new Blob([res], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `export_${start}_${end}.xlsx`
      link.click()
    } catch (error) {
      enqueueSnackbar('Error', { variant: 'error' })
    }
  }

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  console.log(endDateRange, startDateRange, dates)

  return (
    <div className='demo-space-x'>
      <Button variant='contained' onClick={handleCheckin}>
        Check in
      </Button>
      <Button variant='contained' onClick={handleCheckout}>
        Checkout
      </Button>
      <DatePickerWrapper>
        <DatePicker
          isClearable
          selectsRange
          monthsShown={2}
          endDate={endDateRange}
          selected={startDateRange}
          startDate={startDateRange}
          shouldCloseOnSelect={false}
          id='date-range-picker-months'
          onChange={handleOnChangeRange}
          customInput={
            <CustomInput
              dates={dates}
              setDates={setDates}
              label='Export Date'
              end={endDateRange as number | Date}
              start={startDateRange as number | Date}
            />
          }
        />
      </DatePickerWrapper>
      <Button variant='contained' onClick={handleExport}>
        Export
      </Button>
    </div>
  )
}

export default UltranetButton
