import { styled } from '@mui/material/styles';
import MuiToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton';

export const ToggleButton = styled((props: ToggleButtonProps) => (
  <MuiToggleButton sx={{flex: 1, alignItems: 'center', transition: '0.5s'}} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.secondary.main,
  borderColor: theme.palette.secondary.main,
  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.default
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.default
  },
}));