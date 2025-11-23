import { useEffect, useState } from 'react';
import { WebAppProvider, useThemeParams, useInitData } from '@vkruglikov/react-telegram-web-app';
import { Menu } from './components/menu';
import { useColorScheme } from '@mui/material';
import { getMatrixRequest, sendInitData } from './api';
import { AvatarProvider, HistoryProvider, MatrixRequestsProvider, TokenContext } from './contexts';
import { MatrixRequest, TokenPair } from './JSONTypes';

export default function App() {
  //const colorScheme = 'dark'
  const [colorScheme] = useThemeParams()
  const [initDataUnsafe] = useInitData()
  const { setMode } = useColorScheme();
  const [tokenPair, setTokenPair] = useState({access: '', refresh: ''})
  const [initMatrixRequest, setInitMatrixRequest] = useState<MatrixRequest>()

  useEffect(() => {
    if (initDataUnsafe?.user && tokenPair.access === '') {
      sendInitData({joined_by: initDataUnsafe.start_param, ...initDataUnsafe.user}).then(tokenPair => {
        setTokenPair(tokenPair)
        if (initDataUnsafe.start_param) {
          getMatrixRequest(initDataUnsafe.start_param, tokenPair).then(([matrixRequest, newTokenPair]) => {
            setInitMatrixRequest(matrixRequest)
            setTokenPair(newTokenPair)
          })
        }
      })
    }
  }, [initDataUnsafe, tokenPair])

  useEffect(() => {
    if (colorScheme) {
      setMode(colorScheme)
    }
  }, [colorScheme, setMode])

  return <WebAppProvider options={{ smoothButtonsTransition: true }}>
    <TokenContext.Provider value={{tokenPair: tokenPair, setTokenPair: (newTokenPair: TokenPair) => {
      if (tokenPair.access !== newTokenPair.access) {
        setTokenPair(newTokenPair)
      }
    }}}>
      <MatrixRequestsProvider value={initMatrixRequest}>
        <HistoryProvider value={undefined}>
          <AvatarProvider value={undefined}>
            <Menu initTab={Math.max(0, initMatrixRequest?.gender === 'c' ? 1 : 0)} />
          </AvatarProvider>
        </HistoryProvider>
      </MatrixRequestsProvider>
    </TokenContext.Provider>
  </WebAppProvider>
}
