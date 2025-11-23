import { styled } from '@mui/material/styles';
import MuiButton, { ButtonProps } from '@mui/material/Button';

export const ContainedButton = styled((props: ButtonProps) => (
  <MuiButton variant='contained' {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.default
}));