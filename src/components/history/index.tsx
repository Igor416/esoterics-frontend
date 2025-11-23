import { useContext, useState } from 'react'
import { deleteMatrixRequests } from '../../api'
import { HistoryContext, MatrixRequestsContext, TabContext, TokenContext } from '../../contexts'
import { Stack, Typography, Breadcrumbs } from '@mui/material'
import { ContainedButton } from '../styled'
import { Records } from './Records'

export { MiniHistory } from './Mini'
export { ShareButton, CloseButton, ReadButton } from './buttons'

export function History() {
  const {setTab} = useContext(TabContext)
  const {tokenPair} = useContext(TokenContext)
  const {setMatrixRequest} = useContext(MatrixRequestsContext)
  const {history, setHistory} = useContext(HistoryContext)
  const [action, setAction] = useState('')

  if (history && history.length === 0) {
    return <Stack sx={{p: 2}}>
      <Stack>
        <Typography color='textPrimary' variant='h5'>История:</Typography>
        <Typography color='textPrimary' variant='h6'>Пока что пусто...</Typography>
      </Stack>
      <ContainedButton
        sx={{mt: 2}}
        onClick={() => setTab(1)}
      >Рассчитать первую матрицу</ContainedButton>
    </Stack>
  }

  return <Stack sx={{p: 2, width: '100%'}}>
    <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
      <Typography color='textPrimary' variant='h5'>История:</Typography>
      <Breadcrumbs>
        <Typography color='secondary' variant='body1' onClick={() => setAction(action != 'share' ? 'share' : '')}>Поделиться</Typography>
        <Typography color='primary' variant='body1' onClick={() => setAction(action != 'delete' ? 'delete' : '')}>Удалить</Typography>
      </Breadcrumbs>
    </Stack>
    <Records
      onPick={(item) => {setMatrixRequest(item);setTab(item.gender === 'c' ? 2 : 1)}}
      history={history}
      action={action}
      handleResp={setHistory}
    />
    <ContainedButton
      sx={{mt: 2}}
      onClick={history?.length ? () => deleteMatrixRequests(tokenPair).then(setHistory) : () => {}}
    >Очистить историю</ContainedButton>
  </Stack>
}