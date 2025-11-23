import { SvgIconComponent } from "@mui/icons-material"
import { Box, useTheme } from "@mui/material";

interface ActionButtonProps {
  big?: boolean,
  color?: string,
  Icon: SvgIconComponent | false,
  onClick: () => void;
}

export function ActionButton({big = false, color, Icon, onClick}: ActionButtonProps) {
  const theme = useTheme()

  return <Box onClick={Icon != false ? onClick : () => {}} sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    width: big ? 60: 40,
    height: big ? 60 : 40,
    bgcolor: Icon != false ? (color ?? theme.palette.primary.main) : 'transparent',
    transition: '0.5s'
  }}>
    {Icon != false && <Icon sx={{width: big ? 30 : 20, height: big ? 30 : 20, color: theme.palette.background.default}} />}
  </Box>
}