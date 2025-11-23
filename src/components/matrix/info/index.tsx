import { useMemo, useState } from "react";
import { Box, Button, Divider, Grid2, Stack, Typography, useTheme } from "@mui/material";
import { IMatrixData } from "../MatrixData";
import { ContentWrapper, Forecast, Health, Miscellaneous, SmallMatrix } from "../supplies";
import { FrontLayer } from "./FrontLayer";
import { ContainedButton, Dialog } from "../../styled";
import { ChevronLeft, Close } from "@mui/icons-material";

interface InfoProps {
  infoShown: boolean,
  showInfo: (val: boolean) => void,
  data: IMatrixData,
  compatibility: boolean
}

export function Info({infoShown, showInfo, data, compatibility}: InfoProps) {
  const [index, setIndex] = useState(-1)
  const theme = useTheme()

  const category = useMemo(() => {
    if (index >= 0) {
      switch (data.info[index]?.category) {
        case 'Здоровье':
          return <Health data={data} info={data.info[index]} />
        case 'Прогноз на год':
          return <Forecast info={data.info[index]} />
        default:
          return <Stack gap={4} sx={{pt: 2}}>
          {data.info[index]?.blocks.map((block, i) => <Stack key={i} gap={2}>
            <Typography variant='h5' sx={{textAlign: 'center'}}>{block.title}</Typography>
            <Divider />
            <Box sx={{px: 2}}>
              <ContentWrapper content={block.content} />
            </Box>
          </Stack>)}
        </Stack>
      }
    }
    return undefined
  }, [data, index])
  
  return <Stack sx={{mt: 5}}>
    <Dialog fullScreen open={infoShown} onClose={() => showInfo(false)}>
      <Stack direction='row' gap={1} sx={{
        px: 1,
        py: 2,
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <ChevronLeft color='primary' onClick={() => showInfo(false)} />
        <Typography sx={{flex: 1}} variant='h6'>Расшифровка матрицы</Typography>
        <Close color='secondary' onClick={() => showInfo(false)} />
      </Stack>
      <Grid2 container spacing={4} sx={{p: 2}} columns={2}>
        {data.info.map((info, i) => <Grid2 key={i} size={1}>
          <Button fullWidth sx={{height: '100%'}} onClick={() => setIndex(i)}>
            <Stack sx={{width: '100%', height: '100%', justifyContent: 'flex-end'}}>
              <Typography color='textPrimary'>{info.category}</Typography>
              <Divider sx={{
                mt: 1,
                width: '100%',
                borderColor: i % 4 == 0 || i % 4 == 3 ? theme.palette.primary.main : theme.palette.secondary.main
              }} />
            </Stack>
          </Button>
        </Grid2>)}
        <Grid2 size={compatibility ? 2 : 1}>
          <Button fullWidth onClick={() => setIndex(-3)}>
            <Stack sx={{width: '100%'}}>
              <Typography color='textPrimary'>Прочее</Typography>
              <Divider sx={{mt: 1, width: '100%', borderColor: theme.palette[compatibility ? 'secondary' : 'primary'].main}} />
            </Stack>
          </Button>
        </Grid2>
        <Grid2 size={2}>
          <ContainedButton fullWidth sx={{flex: 1, gridColumn: '1 / span 2'}} onClick={() => showInfo(false)}>Закрыть интерпретацию</ContainedButton>
        </Grid2>
      </Grid2>
    </Dialog>
    <FrontLayer
      name={data.info[index]?.category}
      showed={index >= 0}
      prev={index > 0 ? () => setIndex(index - 1) : undefined}
      close={() => setIndex(-1)}
      next={index < data.info.length - 1 ? () => setIndex(index + 1) : () => setIndex(-3)}
    >
      <SmallMatrix
        shown={index >= 0 && !['Здоровье', 'Прогноз на год'].includes(data.info[index]?.category)}
        positions={index >= 0 ? data.info[index].positions : []}
        compatiblity={compatibility}
      />
      {category}
    </FrontLayer>
    <FrontLayer name='Прочее' showed={index === -3} prev={() => setIndex(data.info.length - 1)} close={() => setIndex(-1)}>
      <Miscellaneous shown={index === -3} data={data} compatibility={compatibility} />
    </FrontLayer>
  </Stack>
}