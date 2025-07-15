import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Popover as MuiPopover,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

interface PopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  onClose: () => void;
  sx?: any;
}

const StyledPopover = styled(MuiPopover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[8],
    backgroundColor: theme.palette.background.paper,
  },
}));

const Popover: React.FC<PopoverProps> = ({
  open,
  anchorEl,
  children,
  onClose,
  sx,
}) => {
  const theme = useTheme();

  return (
    <StyledPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={sx}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Paper sx={{ p: 2 }}>{children}</Paper>
    </StyledPopover>
  );
};

export default Popover;
