import { useCallback } from "react"
import { useTheme } from "@mui/material"
import { IosShare } from "@mui/icons-material"
import { useWebApp } from "@vkruglikov/react-telegram-web-app"
import { MatrixRequest } from "../../../JSONTypes"
import { ActionButton } from "./ActionButton"

export function ShareButton({item}: {item: MatrixRequest}) {
  const webapp = useWebApp()
  const theme = useTheme()

  const getLink = useCallback((item: MatrixRequest) => {
    return `https://t.me/share/url?url=https://t.me/matrix_md_bot/main?startapp=${item.id}&text=Посмотри эту матрицу судьбы! ` + 
    `${item.name} ${item.date}${item.gender === 'c' ? ` + ${item.name2} ${item.date2}` : ''}`
  }, [])

  return <ActionButton
    color={theme.palette.secondary.main}
    Icon={IosShare}
    onClick={() => webapp.openTelegramLink(getLink(item))}
  />
}