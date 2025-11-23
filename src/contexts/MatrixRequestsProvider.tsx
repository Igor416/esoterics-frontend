import { createContext, ProviderProps, useEffect, useState } from 'react';
import { MatrixRequest } from '../JSONTypes';

type MatrixRequestsContextType = {
  matrixRequest?: MatrixRequest,
  setMatrixRequest: (matrixRequest?: MatrixRequest) => void
}

export const MatrixRequestsContext = createContext<MatrixRequestsContextType>({
  matrixRequest: undefined,
  setMatrixRequest: () => {}
});

export function MatrixRequestsProvider({ children, value }: ProviderProps<MatrixRequest | undefined>) {
  const [matrixRequests, setMatrixRequests] = useState<MatrixRequest | undefined>(value)

  useEffect(() => {
    setMatrixRequests(value)
  }, [value])

  return <MatrixRequestsContext.Provider value={{matrixRequest: matrixRequests, setMatrixRequest: setMatrixRequests}}>
    {children}
  </MatrixRequestsContext.Provider>
}
