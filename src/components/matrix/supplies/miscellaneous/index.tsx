import { Stack, Typography } from "@mui/material"
import { IMatrixData } from "../../MatrixData"
import { positions, diagrams, diagrams1, diagrams2 } from "./MiscellaneousData"
import { SmallMatrix } from "../SmallMatrix"
import { Avatar } from "../../Avatar"
import { Add, DragHandle } from "@mui/icons-material"

interface MiscellaneousProps {
  shown: boolean
  data: IMatrixData,
  compatibility: boolean
}

export function Miscellaneous({shown, data, compatibility}: MiscellaneousProps) {
  return <Stack sx={{p: 2, gap: 4}}>
    <SmallMatrix shown={shown} positions={positions} compatiblity={compatibility} />
    <Stack sx={{gap: 2}}>
      {diagrams.concat(compatibility ? diagrams2 : diagrams1).map((diagram, i) => <Stack sx={{gap: 1}} key={i}>
        <Typography variant='h5' sx={{textAlign: 'center'}}>{diagram.name}</Typography>
        <Typography variant='body1' sx={{textAlign: 'center'}}>{diagram.desc}</Typography>
        <Stack direction='row' gap={1} sx={{alignItems: 'center', justifyContent: 'center'}}>
          <Avatar size={0.5} arcane={data.combinations[diagram.combinations[0]]} />
          <Add />
          <Avatar size={0.5} arcane={data.combinations[diagram.combinations[1]]} />
          <DragHandle />
          <Avatar size={0.5} arcane={data.combinations[diagram.combinations[2]]} />
        </Stack>
      </Stack>)}
    </Stack>
  </Stack>
}