import { styled } from '@mui/material/styles';
import MuiDialog, { DialogProps } from '@mui/material/Dialog';

export const Dialog = styled((props: DialogProps) => (
  <MuiDialog {...props} />
))(() => ({
  '& .MuiDialog-container .MuiDialog-paper': {
    backgroundImage: 'none'
  },
}));