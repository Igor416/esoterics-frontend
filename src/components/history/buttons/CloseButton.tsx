import { useTheme } from "@mui/material"
import { Close } from "@mui/icons-material"
import { ActionButton } from "./ActionButton"

export function CloseButton({onClose}: {onClose: () => void}) {
  const theme = useTheme()
  
  return <ActionButton
    color={theme.palette.secondary.main}
    Icon={Close}
    onClick={onClose}
  />
}