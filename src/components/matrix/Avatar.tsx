import { useContext, useMemo } from "react"
import { Box, Typography } from "@mui/material"
import { AvatarContext } from "../../contexts"

interface AvatarProps {
  arcane: number
  margin?: boolean
  size?: number
}

export function Avatar({arcane, margin = false, size = 0.5}: AvatarProps) {
  const {ROOT_URL, setArcane} = useContext(AvatarContext)
  
  const modifiedArcane = useMemo(() => {
    switch (arcane) {
      case 8: return 11;
      case 11: return 8;
      case 22: return 0;
      default: return arcane
    }
  }, [arcane])

  return <Box>
    <Box onClick={() => setArcane(modifiedArcane)} sx={{
      position: 'relative',
      float: 'left',
      mr: margin ? 1 : 0,
      width: size * 80,
      height: size * 80,
    }}>
      <img style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        filter: 'brightness(0.7)'
      }} src={`${ROOT_URL}static/cards/icons/${modifiedArcane}.jpg`} />
      <Typography sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }} color='white' variant={size === 1 ? 'h4' : 'h6'}>{arcane}</Typography>
    </Box>
  </Box>
}