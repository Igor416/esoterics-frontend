import { useEffect, useMemo, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, useTheme, Stack, Divider, Box } from '@mui/material';
import { Home as HomeIcon, Favorite, History as HistoryIcon, AutoFixHigh } from '@mui/icons-material';
import { TabContext } from '../../contexts';
import { Home } from '../home';
import { Matrix } from '../matrix';
import { History } from '../history';

export function Menu({initTab}: {initTab: number}) {
  const [tab, setTab] = useState(initTab)
  const theme = useTheme()
  
  useEffect(() => {
    setTab(initTab)
  }, [initTab])

  const routes = useMemo(() => [
    {
      name: 'home',
      component: <Home />,
      icon: <HomeIcon />
    },
    {
      name: 'matrix',
      component: <Matrix />,
      icon: <AutoFixHigh />
    },
    {
      name: 'compatibility',
      component: <Matrix compatibility={true} />,
      icon: <Favorite />
    },
    {
      name: 'history',
      component: <History />,
      icon: <HistoryIcon />
    }
  ], [])

  return <Stack sx={{
      position: 'relative',
      width: '100%',
      height: '100%',
      bgcolor: theme.palette.background.default
    }}>
    <TabContext.Provider value={{tab: tab, setTab: setTab}}>
      <Stack sx={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
        {routes.map((route, i) => <Box key={i} sx={{
          position: 'absolute',
          display: 'flex',
          width: '100%',
          height: '100%',
          transform: `translateX(${(i - tab) * 100}%)`,
          transition: '0.5s ease-in-out'
        }}>
          {route.component}
        </Box>)}
      </Stack>
    </TabContext.Provider>
    <Divider />
    <BottomNavigation value={tab} onChange={(_, v) => setTab(v)}>
      {routes.map((route, i) => 
        <BottomNavigationAction
          key={i}
          icon={route.icon}
          sx={{
            '&.Mui-selected': {
              color: theme.palette.secondary.main
            }
          }}
        />
      )}
    </BottomNavigation>
  </Stack>
}