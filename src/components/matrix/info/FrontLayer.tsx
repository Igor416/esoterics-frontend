import { useCallback, useRef } from "react"
import { Stack, Typography, useTheme } from "@mui/material"
import { ContainedButton, Dialog } from "../../styled"
import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material"

interface FrontLayerProps {
  children: React.ReactNode | React.ReactNode[],
  name: string,
  showed: boolean,
  prev?: () => void,
  close: () => void,
  next?: () => void
}

export function FrontLayer({children, name, showed, prev, close, next}: FrontLayerProps) {
  const theme = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  const switchTab = useCallback((func?: () => void) => {
    if (func && ref.current) {
      ref.current.animate([
        {opacity: 1},
        {opacity: 0},
        {opacity: 1},
      ], 500)
      setTimeout(() => {
        func()
        ref.current?.scrollTo({top: 0})
      }, 250)
    }
  }, [])

  return <Dialog fullScreen open={showed}>
    <Stack ref={ref} sx={{overflowY: 'auto'}}>
      <Stack direction='row' gap={1} sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1300,
        px: 1,
        py: 2,
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <ChevronLeft color='primary' onClick={close} />
        <Typography sx={{flex: 1}} variant='h6'>{name}</Typography>
        <Close color='secondary' onClick={close} />
      </Stack>
      {children}
      <Stack direction='row' gap={1} sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: 1300,
        mt: 1,
        px: 1,
        py: 2,
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <ContainedButton color='secondary' sx={{mx: 2}} disabled={!prev} onClick={() => switchTab(prev)}>
          <ChevronLeft />
        </ContainedButton>
        <ContainedButton sx={{flexGrow: 1, mx: 2}} onClick={close}>Закрыть</ContainedButton>
        <ContainedButton color='secondary' sx={{mx: 2}} disabled={!next} onClick={() => switchTab(next)}>
          <ChevronRight />
        </ContainedButton>
      </Stack>
    </Stack>
  </Dialog>
}