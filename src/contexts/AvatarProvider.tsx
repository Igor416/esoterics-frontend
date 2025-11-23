import { createContext, ProviderProps, useState } from 'react';
import { Dialog, Box } from '@mui/material';

const ROOT_URL = 'http://localhost:8000/'
//const ROOT_URL = '/'

type AvatarContextType = {
  ROOT_URL: string,
  setArcane: (value: number) => void
}

export const AvatarContext = createContext<AvatarContextType>({
  ROOT_URL: '',
  setArcane: () => {}
});

export function AvatarProvider({ children }: ProviderProps<undefined>) {
  const [arcane, setArcane] = useState<number>(-1)

  return <AvatarContext.Provider value={{ROOT_URL: ROOT_URL, setArcane: setArcane}}>
    {children}
    <Dialog sx={{zIndex: 1400}} open={arcane > -1} onClick={() => setArcane(-1)} keepMounted>
      <Box sx={{position: 'relative'}}>
        {Array(22).fill(0).map((_, i) => 
          <img key={i} style={{display: i === arcane ? 'block' : 'none', width: '100%'}} src={`${ROOT_URL}static/cards/m/${i}.jpg`} />
        )}
      </Box>
    </Dialog>
  </AvatarContext.Provider>
}
