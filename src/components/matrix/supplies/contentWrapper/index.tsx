import { useMemo } from "react"
import { IContent } from "../../MatrixData"
import { Stack, Box } from "@mui/material"
import { Avatar } from "../../Avatar"

interface ContentWrapperProps {
  content: IContent[]
}

export function ContentWrapper({content}: ContentWrapperProps) {
  const texts = useMemo(() => content.map(item => {
    let text = item.text.replace(new RegExp('\\n', 'g'), '<br/>')
    text = text.replace(new RegExp('<br/><br/>', 'g'), '<br/>')
    return text.trim()
  }), [content])
  
  return <Stack gap={4}>
    {content.length === 1 && content[0].arcanes.length === 3 && <Stack direction='row' gap={2} sx={{justifyContent: 'center'}}>
      {content[0].arcanes.map((arcane, i) => 
        <Avatar key={i} arcane={arcane} margin={true} size={1} />
      )}
    </Stack>}
    {content.map((item, i) => <Box key={i}>
      {item.arcanes.length === 1 && <Avatar arcane={item.arcanes[0]} margin={true} size={1} />}
      <span dangerouslySetInnerHTML={{__html: texts[i]}}></span>
    </Box>)}
  </Stack>
}