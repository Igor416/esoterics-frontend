import { createContext } from 'react';

export const TabContext = createContext<{
  tab: number,
  setTab: (val: number) => void
}>({
  tab: 0,
  setTab: () => {}
});
