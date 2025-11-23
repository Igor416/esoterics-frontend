import { createContext } from 'react';
import { TokenPair } from '../JSONTypes';

export const TokenContext = createContext<{
  tokenPair: TokenPair,
  setTokenPair: (tokenPair: TokenPair) => void
}>({
  tokenPair: {
    access: '',
    refresh: ''
  },
  setTokenPair: () => {}
});
