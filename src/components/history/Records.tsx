import { Favorite, Male, Female } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Grid2, Skeleton, Stack } from '@mui/material';
import { MatrixRequest, TokenPair } from '../../JSONTypes';
import { ShareButton, DeleteButton } from './buttons/';

interface RecordsProps {
  onPick: (item: MatrixRequest) => void,
  history?: MatrixRequest[],
  action: string,
  handleResp: ([resp, newTokenPair]: [MatrixRequest[], TokenPair]) => void
}

export function Records({onPick, history, action, handleResp}: RecordsProps) {
  return <Grid2 sx={{mt: 1}} container columns={2}>
    {history ? history.map((item, i) => <Grid2 key={i} size={action === 'mini' ? (item.gender === 'c' ? 2 : 1) : 2}>
      <ListItem component='div' secondaryAction={
        (action === 'share' && <ShareButton item={item} />) || (action === 'delete' && <DeleteButton item={item} handleResp={handleResp} />)
      } disablePadding>
        <ListItemButton onClick={() => onPick(item)} sx={{p: 0}}>
          <ListItemAvatar>
            <Avatar className={(item.gender === 'c' ? 'compatibility' : (item.gender === 'm' ? 'male' : 'female')) + '-bg'}>
              {item.gender === 'c' ? <Favorite /> : (item.gender === 'm' ? <Male /> : <Female />)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.name + (item.gender === 'c' ? ` + ${item.name2}` : '')}
            primaryTypographyProps={{color: 'textPrimary'}}
            secondary={item.date + (item.gender === 'c' ? ` + ${item.date2}` : '')}
          />
        </ListItemButton>
      </ListItem>
    </Grid2>) : [0, 1].map(i => <Grid2 key={i} size={action === 'mini' ? 1 : 2}>
      <ListItem component='div' disablePadding>
        <ListItemButton sx={{p: 0}}>
          <ListItemAvatar>
            <Skeleton variant='circular' sx={{height: '100%', m: 1, aspectRatio: 1}} />
          </ListItemAvatar>
          <Stack sx={{width: action === 'mini' ? '100%' : '50%', marginRight: 2}}>
            <Skeleton variant='text' sx={{ fontSize: '2rem', flex: 1 }} />
          </Stack>
        </ListItemButton>
      </ListItem>
    </Grid2>)}
  </Grid2>
}