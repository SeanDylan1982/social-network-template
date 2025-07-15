import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Alert as MuiAlert,
  AlertTitle,
  Typography,
  useTheme,
} from '@mui/material';
import { CheckCircle, Info, Warning, Error } from '@mui/icons-material';

interface AlertProps {
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  closeText?: string;
  sx?: any;
}

const StyledAlert = styled(MuiAlert)(({ theme, type }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
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

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  closeText = 'Close',
  sx,
}) => {
  const theme = useTheme();
  const Icon = IconMap[type];

  return (
    <StyledAlert
      severity={type}
      sx={sx}
      action={
        onClose && (
          <Typography
            variant="body2"
            color="primary"
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
          >
            {closeText}
          </Typography>
        )
      }
    >
      <Icon color={type} sx={{ mr: 1 }} />
      {title && <AlertTitle>{title}</AlertTitle>}
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </StyledAlert>
  );
};

export default Alert;
