import { useRef, useCallback, useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface CarouselProps {
  ages: string[]
  selected: number
  setSelected: (value: number) => void
}

export function Carousel({ages, selected, setSelected}: CarouselProps) {
  const plansRef = useRef<HTMLDivElement>(null)
  const [itemWidth, setItemWidth] = useState(0)
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(
    ({ offset: [ox], movement: [mx], down }) => {
      if (!down) {
        const newIndex = mx < 0 ? selected + 1 : selected - 1;
        const clampedIndex = Math.max(0, Math.min(newIndex, ages.length - 1));

        api.start({ x: -clampedIndex * itemWidth });
        setSelected(clampedIndex);
      } else {
        api.start({ x: ox });
      }
    },
    { from: () => [x.get(), 0], axis: 'x' }
  );

  useEffect(() => {
    if (plansRef.current) {
      setItemWidth(plansRef.current.offsetWidth / 3)
    }
  }, [plansRef])

  useEffect(() => {
    const initialIndex = selected;
    api.start({ x: -initialIndex * itemWidth });
  }, [ages, selected, api, itemWidth]);

  const onTouch = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, ages.length - 1));
    api.start({ x: -clampedIndex * itemWidth });
    setSelected(clampedIndex);
  }, [ages.length, api, itemWidth, setSelected])

  return <Stack direction='row' sx={{position: 'relative', alignItems: 'center', overflow: 'hidden'}}>
    <ChevronLeft onClick={() => onTouch(selected - 1)} sx={{top: '50%', left: 0, transform: 'translateY(-50%)', position: 'absolute'}} />
    <animated.div ref={plansRef} style={{ x, display: 'flex', touchAction: 'none', width: '100%' }} {...bind()}>
      <Box sx={{flex: `0 0 ${itemWidth}px`}} />
      {ages.map((age, i) => <Stack key={i} sx={{flex: `0 0 ${itemWidth}px`}} onClick={() => onTouch(i)}>
        <Box sx={{
          p: 2,
          opacity: i === selected ? 1 : 0.5,
          transform: `scale(${i === selected ? 1 : 0.75})`,
          transition: 'transform 450ms cubic-bezier(0.445, 0.050, 0.550, 0.950), opacity 450ms ease-in-out;'
        }} className={i === selected ? 'active' : ''}>
          <Typography variant='h6' textAlign='center'>{age}</Typography>
        </Box>
      </Stack>)}
      <Box sx={{flex: `0 0 ${itemWidth}px`}} />
    </animated.div>
    <ChevronRight onClick={() => onTouch(selected + 1)} sx={{top: '50%', right: 0, transform: 'translateY(-50%)', position: 'absolute'}} />
  </Stack>
}