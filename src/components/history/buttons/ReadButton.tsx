import { AutoStories } from "@mui/icons-material"
import { ActionButton } from "./ActionButton"

export function ReadButton({onClick}: {onClick: () => void}) {
  return <ActionButton
    big={true}
    Icon={AutoStories}
    onClick={onClick}
  />
}