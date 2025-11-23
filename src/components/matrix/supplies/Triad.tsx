import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Diagram } from "./miscellaneous/MiscellaneousData";
import { IMatrixData } from "../MatrixData";
import { Avatar } from "../Avatar";

interface TriadProps {
  data: IMatrixData,
  diagram: Diagram
}

export function Triad({data, diagram}: TriadProps) {
  const theme = useTheme()

  return <Stack sx={{justifyContent: 'center', alignItems: 'stretch', gap: 2, width: '100%'}} direction='row'>
    {diagram.labels && <Stack sx={{minWidth: '15%', justifyContent: 'space-around'}}>
      {diagram.labels.map((label, j) => <Typography variant='body1' key={j}>{label}</Typography>)}
    </Stack>}
    <Stack sx={{gap: 1, height: '100%'}}>
      {[[0, 1].map((i) => <Avatar size={0.5} key={i} arcane={data.combinations[diagram.combinations[i]]} />)]}
    </Stack>
    <Stack direction='row' sx={{alignItems: 'center'}}>
      <svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0V2H18V46H0V48H20V25H38V23H20V0H0Z" fill={theme.palette.primary.contrastText}></path>
      </svg>
    </Stack>
    <Stack direction='row' sx={{alignItems: 'center'}}>
      <Avatar size={0.5} arcane={data.combinations[diagram.combinations[2]]} />
    </Stack>
  </Stack>
}

interface DiagramValueProps {
  value: string | number,
  color: string
}

export function DiagramValue({value, color}: DiagramValueProps) {
  return <Box sx={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
    <Box sx={{
      position: 'initial',
      width: 35,
      fontSize: 17
    }} className={`matrix-circle ${color} active`}>{value}</Box>
  </Box>
}