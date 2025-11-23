import { useRef, useEffect, useState } from "react"
import { CircularProgress, Stack, Typography } from "@mui/material"

export function LoadingText() {
  const texts = ['Рассчитываем матрицу', 'Генерируем Текста', 'Отправляем вам']
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (active === 2) {
        clearInterval(interval)
      } else {
        if (ref.current) {
          ref.current.animate([
            {opacity: 1},
            {opacity: 0},
            {opacity: 1},
          ], 300)
        }
        setTimeout(() => setActive(active + 1), 150)
      }
    }, 2000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [active, ref])

  return <Stack gap={2} sx={{mt: 3, alignItems: 'center'}}>
    <CircularProgress />
    <Typography color='textPrimary' ref={ref} variant='h5'>{texts[active]}</Typography>
  </Stack>
}