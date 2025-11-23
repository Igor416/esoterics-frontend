import { useMemo, useRef, useEffect } from "react"
import { Box, useTheme } from "@mui/material"

interface SmallMatrixProps {
  shown: boolean,
  positions: string[],
  compatiblity: boolean
}

export function SmallMatrix({shown, positions, compatiblity}: SmallMatrixProps) {
  const theme = useTheme()

  const main = useMemo(() => document.getElementById('matrix-diagram-container-' + (compatiblity ? 'comp' : 'main'))!, [compatiblity])
  const local = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const matrix = document.getElementById('matrix-diagram-' + (compatiblity ? 'comp' : 'main'))!
    const circles = Array.from(matrix.getElementsByClassName('matrix-circle')!) as HTMLElement[]
    if (shown && local.current) {
      local.current.appendChild(matrix)
      if (positions?.length) {
        circles.forEach(c => c.classList.add('active'))
        const filtered = circles.filter(c => !positions.includes(c.dataset.combination!))
        if (filtered.length < circles.length) {
          filtered.forEach(c => c.classList.remove('active'))
        }
      }
    } else if (local.current) {
      main.insertBefore(matrix, main.childNodes[1])
      circles.forEach(c => c.classList.add('active'))
    }
  }, [compatiblity, local, main, positions, shown])

  return <Box ref={local} sx={{
    position: 'relative',
    fontSize: '4px',
    width: shown ? '100%' : '0%',
    aspectRatio: 1,
    color: theme.palette.text.primary
  }} />
}