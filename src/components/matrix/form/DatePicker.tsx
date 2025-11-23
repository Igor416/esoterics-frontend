import { useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';

interface ScrollableListProps {
  items: string[];
  selected: string;
  setSelected: (value: string) => void
  color: string
}

const days = Array.from({ length: 31 }, (_, i) => (i + 1 > 9 ? `${i + 1}` : `0${i + 1}`));
const months = Array.from({ length: 12 }, (_, i) => (i + 1 > 9 ? `${i + 1}` : `0${i + 1}`));
const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());
const itemHeight = 40;

function ScrollableList({ items, selected, setSelected, color }: ScrollableListProps) {
  const theme = useTheme()
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const bind = useDrag(
    ({ offset: [, oy], down }) => {
      if (!down) {
        const newIndex = Math.ceil(-oy / itemHeight);
        const clampedIndex = Math.max(0, Math.min(newIndex, items.length - 1));

        api.start({ y: -clampedIndex * itemHeight });
        setSelected(items[clampedIndex]);
      } else {
        api.start({ y: oy });
      }
    },
    { from: () => [0, y.get()], axis: 'y' }
  );

  useEffect(() => {
    const initialIndex = items.indexOf(selected);
    api.start({ y: -initialIndex * itemHeight });
  }, [items, selected, api]);

  const onTouch = useCallback((index: number) => {
    api.start({ y: -index * itemHeight });
    setSelected(items[index]);
  }, [api, items, setSelected])

  return <Box sx={{flex: 1, overflow: 'hidden', touchAction: 'none', height: itemHeight * 3}} {...bind()}>
    <animated.div className='scrollable-list' style={{ y }}>
      <Box sx={{height: itemHeight + 'px'}}></Box>
      {items.map((item, index) => <Stack key={index} onClick={() => onTouch(index)} sx={{
          transition: '0.3s',
          height: itemHeight + 'px',
          transformOrigin: 'center',
          transform: `scale(${item === selected ? 1.25 : 1})`,
          justifyContent: 'center'
        }}>
        <Typography textAlign='center' sx={{
          transition: '0.3s',
          fontWeight: item === selected ? 'bold' : 'normal',
          color: item === selected ? (color === 'secondary' ? theme.palette.secondary.main : theme.palette.primary.main) : theme.palette.text.primary,
        }}>
          {item}
        </Typography>
      </Stack>)}
      <Box sx={{height: itemHeight + 'px'}}></Box>
    </animated.div>
  </Box>
}

interface DatePicker {
  date: string,
  setDate: (val: string) => void,
  color: 'primary' | 'secondary'
}

export function DatePicker({date, setDate, color}: DatePicker) {
  const [day, setDay] = useState(days[14]);
  const [month, setMonth] = useState(months[5]);
  const [year, setYear] = useState(years[24]);

  useEffect(() => {
    if (date.length > 0) {
      const [day, month, year] = date.split('.')
      
      setDay(day ?? days[14]);
      setMonth(month ?? months[5]);
      setYear(year ?? years[24]);
    }
  }, [date])

  const selectDay = useCallback((v: string) => {
    const [, month, year] = date.split('.')
    setDay(v)
    setDate(`${v}.${month ?? months[5]}.${year ?? years[24]}`)
  }, [date, setDate])

  const selectMonth = useCallback((v: string) => {
    const [day, , year] = date.split('.')
    setMonth(v)
    setDate(`${day ?? days[14]}.${v}.${year ?? years[24]}`)
  }, [date, setDate])

  const selectYear = useCallback((v: string) => {
    const [day, month] = date.split('.')
    setYear(v)
    setDate(`${day ?? days[14]}.${month ?? months[5]}.${v}`)
  }, [date, setDate])

  return <>
    <Divider />
    <Stack gap={2} direction='row' sx={{
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    }}>
      <Stack direction='row' sx={{alignItems: 'center', height: itemHeight * 3}}>
        <ChevronRight sx={{transition: '0.3s'}} color={color} />
      </Stack>
      <ScrollableList items={days} selected={day} setSelected={selectDay} color={color} />
      <Stack direction='row' sx={{alignItems: 'center', height: itemHeight * 3}}>
        <Typography sx={{transition: '0.3s'}} color={color} variant='h6'>/</Typography>
      </Stack>
      <ScrollableList items={months} selected={month} setSelected={selectMonth} color={color} />
      <Stack direction='row' sx={{alignItems: 'center', height: itemHeight * 3}}>
        <Typography sx={{transition: '0.3s'}} color={color} variant='h6'>/</Typography>
      </Stack>
      <ScrollableList items={years} selected={year} setSelected={selectYear} color={color} />
      <Stack direction='row' sx={{alignItems: 'center', height: itemHeight * 3}}>
        <ChevronLeft sx={{transition: '0.3s'}} color={color} />
      </Stack>
    </Stack>
    </>
}
