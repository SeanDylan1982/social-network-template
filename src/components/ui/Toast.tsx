import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, useTheme } from '@mui/material';
import { CheckCircle, Info, Warning, Error } from '@mui/icons-material';

interface ToastProps {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  duration?: number;
  onClose?: () => void;
}

const StyledToast = styled(Box)(({ theme, type }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(['transform', 'opacity']),
  maxWidth: '300px',
  '&.success': {
    borderLeft: `4px solid ${theme.palette.success.main}`,
  },
  '&.info': {
    borderLeft: `4px solid ${theme.palette.info.main}`,
  },
  '&.warning': {
    borderLeft: `4px solid ${theme.palette.warning.main}`,
  },
  '&.error': {
    borderLeft: `4px solid ${theme.palette.error.main}`,
  },
}));

const IconMap = {
  success: CheckCircle,
  info: Info,
  warning: Warning,
  error: Error,
} as const;

const Toast: React.FC<ToastProps> = ({ type, message, duration = 5000, onClose }) => {
  const theme = useTheme();
  const Icon = IconMap[type];

  return (
    <StyledToast className={type}>
      <Icon color={type} />
      <Typography variant="body2" color="text.primary">
        {message}
      </Typography>
    </StyledToast>
  );
};

export default Toast;
