import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Snackbar as MuiSnackbar,
  SnackbarContent,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface SnackbarProps {
  open: boolean;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  onClose: () => void;
  autoHideDuration?: number;
}

const StyledSnackbar = styled(MuiSnackbar)({
  '& .MuiSnackbar-anchorOriginBottomLeft': {
    bottom: 24,
    left: 24,
  },
  '& .MuiSnackbar-anchorOriginBottomCenter': {
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  '& .MuiSnackbar-anchorOriginBottomRight': {
    bottom: 24,
    right: 24,
  },
});

const StyledSnackbarContent = styled(SnackbarContent)(({ theme, type }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2),
  '& .MuiSnackbarContent-message': {
    color: theme.palette.text.primary,
    fontSize: '0.875rem',
  },
  '& .MuiSnackbarContent-action': {
    marginRight: theme.spacing(1),
  },
  '&.success': {
    borderLeft: `4px solid ${theme.palette.success.main}`,
  },
  '&.warning': {
    borderLeft: `4px solid ${theme.palette.warning.main}`,
  },
  '&.error': {
    borderLeft: `4px solid ${theme.palette.error.main}`,
  },
  '&.info': {
    borderLeft: `4px solid ${theme.palette.info.main}`,
  },
}));

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  type,
  onClose,
  autoHideDuration = 6000,
}) => {
  const theme = useTheme();

  return (
    <StyledSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <StyledSnackbarContent
        className={type}
        message={
          <Typography variant="body2" color="text.primary">
            {message}
          </Typography>
        }
        action={
          <StyledCloseButton
            size="small"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon fontSize="small" />
          </StyledCloseButton>
        }
      />
    </StyledSnackbar>
  );
};

export default Snackbar;
