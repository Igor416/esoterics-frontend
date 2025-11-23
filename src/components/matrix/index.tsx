import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { IMatrixData } from './MatrixData'
import { SubmitButton, Form } from './form'
import { MatrixBackground, MatrixBackground1, MatrixForeground, MatrixForeground1 } from './representation'
import { MatrixRequest } from '../../JSONTypes'
import { sendMatrixRequest } from '../../api'
import { MatrixRequestsContext, TokenContext } from '../../contexts'
import { Info } from './info'
import { ReadButton, ShareButton } from '../history'
import { LoadingMatrix, LoadingText } from './supplies'

export function Matrix({compatibility = false}: {compatibility?: boolean}) {
  const {tokenPair, setTokenPair} = useContext(TokenContext)
  const [request, setRequest] = useState<MatrixRequest>()
  const {matrixRequest} = useContext(MatrixRequestsContext)
  const [data, setData] = useState<IMatrixData>()
  const [waiting, setAsWaiting] = useState(false)
  const [infoShown, showInfo] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const theme = useTheme()

  const updateData = useCallback((data?: IMatrixData) => {
    if (ref.current) {
      ref.current.animate([
        {opacity: 1},
        {opacity: 0},
        {opacity: 1},
      ], 300)
      setTimeout(() => setData(data), 150)
    }
  }, [ref])

  const beginWaiting = useCallback(() => {
    if (ref.current) {
      const animation = ref.current.animate([
        {opacity: 1},
        {opacity: 0},
        {opacity: 1},
      ], 300)
      setTimeout(() => setAsWaiting(true), 150)
      return animation
    }
  }, [ref])

  useEffect(() => {
    if (!data) {
      setRequest({
        name: '',
        date: '',
        gender: compatibility ? 'c' : 'f',
        name2: '',
        date2: '',
      })
    } else {
      setAsWaiting(false)
    }
  }, [data, compatibility])

  useEffect(() => {
    if (matrixRequest) {
      setRequest(matrixRequest)
    }
  }, [matrixRequest])

  useEffect(() => {
    if (data && request && tokenPair.access !== '') {
      sendMatrixRequest(request, tokenPair).then(([, newTokenPair]) => {
        setTokenPair(newTokenPair);
      })
    }
  }, [data, request, setTokenPair, tokenPair])

  return <Stack ref={ref} sx={{flex: 1}}>
    {!data && request && !waiting && <Form
      compatibility={compatibility}
      request={request}
      setRequest={setRequest}
    />}
    {(data || waiting) && <Stack id={'matrix-diagram-container-' + (compatibility ? 'comp' : 'main')}>
      {request && <Stack sx={{mt: 2}}>
        <Typography color='textPrimary' textAlign='center' variant='h5'>Матрица {compatibility ? 'Совместимости' : 'Судьбы'}</Typography>
        <Typography color='textPrimary' textAlign='center' variant='h6'>
          {request.name} {request.date}{compatibility ? ` + ${request.name2} ${request.date2}` : ''}
        </Typography>
      </Stack>}
      <Box id={'matrix-diagram-' + (compatibility ? 'comp' : 'main')} sx={{
        mt: 2,
        position: 'relative',
        fontSize: '4px',
        width: '100%',
        aspectRatio: 1,
        color: theme.palette.text.primary
      }}>
        {data ? <>
          {compatibility ? <MatrixBackground1 /> : <MatrixBackground />}
          {compatibility ? <MatrixForeground1 data={data} /> : <MatrixForeground data={data} />}
        </> : <LoadingMatrix compatibility={compatibility} />}
      </Box>
      {data && <Info infoShown={infoShown} showInfo={showInfo} data={data} compatibility={compatibility} />}
    </Stack>}
    <Stack gap={2}>
      {data && <Typography color='textPrimary' variant='h5' textAlign='center'>Расшифровка:</Typography>}
      <Stack direction='row' sx={{gap: 2, justifyContent: 'center', alignItems: 'flex-end'}}>
        {data && <>
          <ShareButton item={request!} />
          <ReadButton onClick={() => showInfo(true)} />
        </>}
        {waiting ? <LoadingText /> : <SubmitButton
          request={request}
          compatibility={compatibility}
          data={data}
          setData={updateData}
          beginWaiting={beginWaiting}
        />}
      </Stack>
    </Stack>
  </Stack>
}