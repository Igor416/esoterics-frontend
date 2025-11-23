import { createContext, ProviderProps, useCallback, useContext, useEffect, useState } from 'react';
import { MatrixRequest, TokenPair } from '../JSONTypes';
import { TokenContext } from './TokenContext';
import { getMatrixRequests } from '../api';
import { TabContext } from './TabContext';

type HistoryContextType = {
  history?: MatrixRequest[],
  setHistory: ([resp, newTokenPair]: [MatrixRequest[], TokenPair]) => void
}

export const HistoryContext = createContext<HistoryContextType>({
  history: undefined,
  setHistory: () => {}
});

export function HistoryProvider({ children, value = undefined }: ProviderProps<undefined>) {
  const {tokenPair, setTokenPair} = useContext(TokenContext)
  const {tab} = useContext(TabContext)
  const [history, setHistory] = useState<MatrixRequest[] | undefined>(value)

  const handleResp = useCallback(([resp, newTokenPair]: [MatrixRequest[], TokenPair]) => {
    setTokenPair(newTokenPair)
    setHistory(resp)
  }, [setTokenPair])

  useEffect(() => {
    if (tokenPair.access !== '' && tab < 3) {
      getMatrixRequests(tokenPair).then(handleResp)
    }
  }, [handleResp, setTokenPair, tokenPair, tab])

  return <HistoryContext.Provider value={{history: history, setHistory: handleResp}}>
    {children}
  </HistoryContext.Provider>
}
