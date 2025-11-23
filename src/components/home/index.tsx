import { Box, Button, Divider, Link, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { TabContext } from "../../contexts";
import { ArrowDownward, AutoFixHigh, Favorite, History } from "@mui/icons-material";

export function Home() {
  const {setTab} = useContext(TabContext)
  
  return <Stack gap={2} sx={{flex: 1, p: 2}}>
    <Typography variant='h4' color='textPrimary' sx={{textAlign: 'center'}}>Добро пожаловать!</Typography>
    <Typography variant='h6' color='textPrimary' sx={{textAlign: 'center'}}>Перед вами бот калькулятор матриц судьбы</Typography>
    <Stack gap={2}>
      <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
        <Button onClick={() => setTab(1)} variant='contained'>
          <Typography color='textPrimary'>Матрица судьбы</Typography>
        </Button>
        <Box sx={{flex: 1}} />
        <AutoFixHigh color='secondary' />
      </Stack>
      <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
        <Button onClick={() => setTab(2)} variant='contained'>
          <Typography color='textPrimary'>Матрица совместимости</Typography>
        </Button>
        <Box sx={{flex: 1}} />
        <Favorite color='secondary' />
      </Stack>
      <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
        <Button onClick={() => setTab(3)} variant='contained'>
          <Typography color='textPrimary'>История запросов</Typography>
        </Button>
        <Box sx={{flex: 1}} />
        <History color='secondary' />
      </Stack>
    </Stack>
    <Divider />
    <Typography variant='h6' color='textPrimary' sx={{textAlign: 'center'}}>
      Этот бот единственный в интернете где собрана вся информация абсолютно бесплатно!
    </Typography>
    <Divider />
    <Typography variant='h6' color='textPrimary' sx={{textAlign: 'center'}}>
      Я его делал сам, еще в 2024 году, если вы вдруг увидите какие-то недочеты, или наоборот все отлично, буду благодарен любой обратной связи! Вот мой тг юз
      <Link href="https://t.me/wdym8inch3s">
        <Typography component='span' color='primary' variant='h6' sx={{ml: 1}}>@wdym8inch3s</Typography>
      </Link>
    </Typography>
    <Divider />
    <Stack direction='row' gap={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
      <Typography variant='h6' color='textPrimary' sx={{textAlign: 'center'}}>Навигация внизу</Typography>
      <ArrowDownward color='secondary' />
    </Stack>
  </Stack>
}