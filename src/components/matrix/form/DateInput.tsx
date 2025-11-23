import { TextField } from "@mui/material"
import { useCallback, useEffect, useState, KeyboardEvent } from "react"

interface DateInputProps {
  date: string,
  setDate: (val: string) => void,
  label: string
}

export function DateInput({date, setDate, label}: DateInputProps) {
  const [val, setVal] = useState('')
  const [errorShowed, showError] = useState(false)
  const [focused, focus] = useState(false)

  useEffect(() => {
    if (!focused && date.length === 10) {
      setVal(date)
    }
  }, [date, focused])

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.target) {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    }
  };

  const updateVal = useCallback((v: string) => {
    let [day, month, year] = v.split('.')
    if (v.length > 0) {
      if (day.length === 1) {
        day = '0' + day
      } else if (Number(day) > 31) {
        day = '0' + day[0]
        showError(true)
      } else {
        showError(false)
      }
      if (month?.length === 1) {
        month = '0' + month
      } else if (Number(month) > 12) {
        month = '0' + month[0]
        showError(true)
      } else {
        showError(false)
      }
      switch (year?.length) {
        case 0:
          year = '2000';
          break;
        case 1:
          year = '200' + year;
          break;
        case 2:
          year = '200' + year;
          break;
        case 3:
          year += '0'
          break
      }
      switch (v.split('.').length) {
        case 1: {
          [, month, year] = date.split('.');
          break;
        }
        case 2: {
          year = date.split('.')[2]
          break
        }
      }
      
      setDate(`${day}.${month}.${year}`)
    } else {
      setDate('')
    }
    if (v.length === 2 && val.length === 1 && !v.endsWith('.')) {
      v += '.'
    } else if (v.length === 5 && val.length === 4 && !v.endsWith('.')) {
      v += '.'
    }
    setVal(v)
  }, [date, setDate, val])

  return <TextField
    error={errorShowed}
    helperText={errorShowed ? 'Невозможная дата!' : ''}
    id='date'
    placeholder='01.01.2000'
    label={label}
    value={val}
    onFocus={() => focus(true)}
    onBlur={() => focus(false)}
    onChange={e => updateVal(e.target.value)}
    onKeyDown={handleKeyPress}
    variant='outlined'
  />
}