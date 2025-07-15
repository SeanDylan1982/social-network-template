import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Tooltip as MuiTooltip,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

interface TooltipProps {
  title: string;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  arrow?: boolean;
  sx?: any;
}

const StyledTooltip = styled(MuiTooltip)(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1),
    fontSize: '0.875rem',
  },
  '& .MuiTooltip-arrow': {
    color: theme.palette.background.paper,
  },
}));

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  arrow = true,
  sx,
}) => {
  return (
    <StyledTooltip
      title={
        <Paper sx={{ p: 1 }}>
          <Typography variant="body2" color="text.primary">
            {title}
          </Typography>
        </Paper>
      }
      placement={placement}
      arrow={arrow}
      sx={sx}
    >
      {children}
    </StyledTooltip>
  );
};

export default Tooltip;
