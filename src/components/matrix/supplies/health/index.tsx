import { useMemo, useState } from 'react'
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { IInfo, IMatrixData } from '../../MatrixData'
import { rows } from './HealthData'
import { Triad } from '../Triad'
import { SmallMatrix } from '../SmallMatrix'
import { ContentWrapper } from '../contentWrapper'
import { FrontLayer } from '../../info/FrontLayer'

interface HealthProps {
  data: IMatrixData,
  info: IInfo
}

export function Health({data, info}: HealthProps) {
  const [index, setIndex] = useState(-1)

  const row = useMemo(() => {
    if (index > -1) {
      return rows[index]
    }
    return {
      color: 'white',
      name: '',
      desc: '',
      meaning: '',
      combinations: []
    }
  }, [index])

  return <Stack sx={{width: '100%'}}>
    <Typography textAlign='center' variant='h5' sx={{my: 2}}>Карта здоровья</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{px: 1}}>Чакры</TableCell>
          <TableCell sx={{px: 1}} align='center'>Физика</TableCell>
          <TableCell sx={{px: 1}} align='center'>Энергия</TableCell>
          <TableCell sx={{px: 1}} align='center'>Эмоции</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => <TableRow onClick={() => setIndex(i)} key={i} sx={{'&:last-child td': { border: 0 } }}>
          <TableCell sx={{py: 2, px: 1}}>
            <Stack>
              <Typography variant='subtitle1'>{row.name}</Typography>
            </Stack>
          </TableCell>
          {row.combinations.map((combination, j) => <TableCell key={j}>
            <Box sx={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
              <Box sx={{
                position: 'initial',
                width: 40
              }} className={`matrix-circle ${row.color} active`}>{data.combinations[combination]}</Box>
            </Box>
          </TableCell>)}
        </TableRow>)}
      </TableBody>
    </Table>
    <FrontLayer
      name={`${row.name} (${row.meaning})`}
      showed={index > -1}
      prev={index === 0 ? undefined : () => setIndex(index - 1)}
      close={() => setIndex(-1)}
      next={index === rows.length - 1 ? undefined : () => setIndex(index + 1)}
    >
      <Stack gap={2} sx={{p: 2}}>
        <Typography>{row.desc}</Typography>
        <SmallMatrix shown={index > -1} positions={row.combinations} compatiblity={false} />
        <ContentWrapper content={index > -1 ? info.blocks[index].content : []} />
        <Triad data={data} diagram={{
          name: '',
          desc: '',
          labels: ['Физика', 'Энергия'],
          combinations: row.combinations
        }} />
      </Stack>
    </FrontLayer>
  </Stack>
}