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
  const [dates, setDates] = useState<Date[]>([])
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [startDateRange, setStartDateRange] = useState<DateType>(null)

  const handleCheckin = () => {
    console.log('Check in')
    UserService.checkin()
  }

  const handleCheckout = () => {
    console.log('Check out')
    UserService.checkout()
  }

  const handleExport = () => {
    if (!startDateRange || !endDateRange) return
    console.log('Export')
    UserService.exportExcel({
      //   start: '2023-02-02',
      //   end: '2023-02-02'
      start: format(startDateRange as Date, 'yyyy-MM-dd'),
      end: format(endDateRange as Date, 'yyyy-MM-dd')
    })
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
              label='Invoice Date'
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
