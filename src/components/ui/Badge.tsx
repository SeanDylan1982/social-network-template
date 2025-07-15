import React from 'react';
import { styled } from '@mui/material/styles';
import { Chip as MuiChip } from '@mui/material';
import { useTheme } from '@mui/material';

const StyledChip = styled(MuiChip)(({ theme, variant }) => ({
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.875rem',
  fontWeight: 'bold',
  transition: theme.transitions.create(['background-color', 'color']),
  '&.default': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&.secondary': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  '&.destructive': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  '&.success': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  '&.warning': {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  '&.info': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
}));

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info';
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', label, ...props }) => {
  const theme = useTheme();

  return (
    <StyledChip
      className={variant}
      label={label}
      size="small"
      {...props}
    />
  );
};

export { Badge };
